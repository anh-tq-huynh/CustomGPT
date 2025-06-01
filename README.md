# Introduction: CustomGPT - 2nd place in the competition
This is a group project, building a chatbot that returns ChatGPT4.0 's responses using REST API in the course of 2 weeks. We spent 1 week researching and understanding the client's challenges, and another week for coding. This is a participation in [Raksa AI Innovation Challenge](https://github.com/anh-tq-huynh/CustomGPT/blob/main/Raksa%20AI%20Innovation%20Challenge%20_%20Rakennusalan%20tieto-%20ja%20taitokeskittyma%CC%88.pdf) during my first year in Metropolia UAS. With this project, we secured second place in the competition.

In this contest, our team was requested to help the client, FIGBC - Green Building Council Finland to solve their emerging challenge. FIGBC is a non-profit association of sustainable built environment, providing consultancy for their members to build a sustainable built environment throughout the value chain and life cycle. 

On a daily basis, they receive a lot of questions regarding sustainability. Many times, the questions are repetitive, resulting in a waste of personnel resources at FIGBC who repeatedly answer the same questions. 

## Functionalities
The CustomGPT(commercial name is Sustainability Insight AI) is built by 2 steps:
**Train ChatGPT4.0**
1. Provide reliable sources of information, based on the commonly asked questions(both the questions and information sources are provided by FIGBC, to ensure accuracy.
2. The ChatGPT4.0 is also trained to provide sources as they answer.
3. If the user requests to speak to a human staff, then the conversation will be summarised, and contact information is provided.

**Build chatbot with web interface**
1. Retrieve API key of the trained GPT
2. Apply the API into the backend code and the web interface
3. Code the feedback system
  - Buttons to choose if the response is helpful or not
  - Save the feedbacks and response into the [json file](https://github.com/anh-tq-huynh/CustomGPT/blob/main/feedback/feedback.json).

**Note**: As the competition occurs during Fall 2024, at this point, we are still in the phase of learning Python, JavaScript, HTML, CSS, we used the help of AI, including ChatGPT and Gemini to help us with coding. At the end of 2024, we have gathered all the skills needed to code this project. The usage of the skills in this project, without the help of AI, is demonstrated better in the project [VaccineVoyage2.0](https://github.com/TaysaAbinader/VaccineVoyage2.0)

## Technologies used
- Python
- HTML
- JavaScript
- CSS
- Flask
- OpenAI API
- Flask-CORS
- python-dotenv
  
## See it in action
_1.Prompt with a question_

<img width="515" alt="Prompt with a question" src="https://github.com/user-attachments/assets/a83a01f3-230e-4684-9afa-d07c768ac31d" />

_2.Continued response_

<img width="512" alt="Continued response" src="https://github.com/user-attachments/assets/21eaffa7-6d86-4825-a91a-11d92f158e14" />

_3.Feedback buttons_

<img width="515" alt="Feedback buttons" src="https://github.com/user-attachments/assets/4a2e9c21-d2b7-438d-8f5c-45762d02a4fe" />

_4.Feedbacks saved in json file_

<img width="524" alt="Feedbacks saved in json" src="https://github.com/user-attachments/assets/810f14c9-6d36-42b0-a6d6-846c12497a64" />

## Value proposition
[Value Proposition Video (30s)](https://youtu.be/PuZjVkw9fiM)

<img width="500" alt="image" src="https://github.com/user-attachments/assets/e59018ad-021a-4934-8696-8076b0fe3206" />

- [Leaflet](https://github.com/anh-tq-huynh/CustomGPT/blob/main/AI%20tool%20Leaflet_FIGBC.pdf)
- [Presentation](https://github.com/anh-tq-huynh/CustomGPT/blob/main/SUSTAINABILITY%20INSIGHT%20AI_Presentation.pdf)


## How to run
### Prerequisite
- Please make sure that you have Python installed
- Train your GPT and retrieve its API key. Follow this [instruction](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key)

### Run the program
1. Go to the folder you would like to save your files
```bash
cd <your-path>
```
2. Clone this repository and go to the main folder
```bash
git clone https://github.com/anh-tq-huynh/CustomGPT
cd <your-path>/CustomGPT
```
3. Open ```.env```and replace ```<YOUR-API-KEY>```with the keys you retrieved from the GPT
4. Install the required libraries
```bash
pip install flask openai flask-cors python-dotenv
```
5. Run the backend
```bash
python app.py
```
6. Open ```index.html```with the browser (Chrome, Firefox, Edge, etc)
7. Enjoy!

## Future plan
If I were to have a chance to work further on this project, I would look into:
* Integrate into Wordpress or other website manager server
* Expand the feedback system
* More testing from FIGBC and construction field experts for better accuracy
* Refine chatbot's response (at the moment, it only shows part of the response from the actual GPT)
* Spend more time into debugging

## Acknowledgement
Special thanks to the team members who brought this project to life:
* [Tram Nguyen](https://github.com/TramNguyenICT) - Train GPT, build the code to connect and retrieve reponses using API
* [Vivian Nguyen](https://github.com/veeveevu) - Train GPT, research, identify challenges
* [Hanh Truong](https://github.com/HanhTr1) - Train GPT, research
* [Anh Tran](https://github.com/anhlt13) - Train GPT, research, find information how to integrate the chatbot to Wordpress
* [Anh Huynh](https://github.com/anh-tq-huynh) - Train GPT, code for feedback system, create marketing plan and collaterals
