package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	b64 "encoding/base64"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/rs/xid"
	sendgrid "github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	qrcode "github.com/skip2/go-qrcode"
)

// Response message
type Response struct {
	Url    string `json:"url"`
	QrCode string `json:"code"`
}

type jsonData struct {
	email string
	label string
}

func createTokenRecord(email string, qrcode string, token string) {
	url := fmt.Sprintf("https://api.backendless.com/%s/%s/data/simplefeedback", os.Getenv("BL_APP_KEY"), os.Getenv("BL_API_KEY"))
	fmt.Println("URL:>", url)

	var recordJSONStr string
	recordJSONStr = fmt.Sprintf(`{"email":"%s", "qr_code_base64":"%s", "token":"%s"}`, email, qrcode, token)
	var jsonStr = []byte(recordJSONStr)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	fmt.Println("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))

}

// Handler for output
func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	fmt.Println("Received body: ", request.Body)

	// decode json
	decoder := json.NewDecoder(strings.NewReader(request.Body))
	var d jsonData
	err := decoder.Decode(&d)
	if err != nil {
		panic(err)
	}

	token := xid.New()
	var emailStr string
	emailStr = d.email
	// create qr code
	url := fmt.Sprintf("%s/vote/%s", os.Getenv("SITE_URL"), token)
	png, err := qrcode.Encode(url, qrcode.Medium, 256)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}
	// create base64 string
	uEnc := b64.StdEncoding.EncodeToString(png)
	// handle token - use backendless to create record
	createTokenRecord(emailStr, uEnc, token.String())
	// dashboard link
	redirectURL := fmt.Sprintf("/dashboard/%s", token)
	redirectURLWithBase := fmt.Sprintf("%s%s", os.Getenv("SITE_URL"), redirectURL)
	// create mailing - use sendgrid
	from := mail.NewEmail("smile-feedback ", "info@smile-feedback.de")
	subject := "www.smile-feedback.de - Ihr Feedback-Code"
	to := mail.NewEmail("Paul", "p.dircksen@gmail.com")
	plainTextContent := "Hallo, vielen Dank für die Nutzung von www.smile-feedback.de. Über den nachfolgenden Link gelangen Sie zu Ihrem persönlichen Bereich. Auf der Seite können Sie den personalisierten Feedback-Code einsehen und herunterladen."
	htmlContent := "<html><style>body{font-family: arial;}</style><body>Hallo,<br>vielen Dank für die Nutzung von www.smile-feedback.de.<br><br>Über den nachfolgenden Link gelangen Sie zu Ihrem persönlichen Bereich.<br>Auf der Seite können Sie den personalisierten Feedback-Code einsehen und herunterladen. <a href='%s'>zum Dashboard</a></body></html>"
	htmlContentFilled := fmt.Sprintf(htmlContent, redirectURLWithBase)

	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContentFilled)
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(message)
	if err != nil {
		log.Println(err)
	} else {
		fmt.Println("email successfully sent")
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}

	r := Response{
		Url:    redirectURL,
		QrCode: uEnc,
	}
	rbytes, err := json.Marshal(r)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	resp := events.APIGatewayProxyResponse{Body: string(rbytes), StatusCode: 200}
	resp.Headers["Access-Control-Allow-Origin"] = "*"

	return resp, nil
}

func main() {
	lambda.Start(Handler)
}
