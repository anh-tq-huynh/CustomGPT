from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai
import json

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Allow cross-origin requests from your frontend
CORS(app, resources={r"/ask-gpt": {"origins": "http://localhost:63342"},
                     r"/save_feedback": {"origins": "http://localhost:63342"}})

# Set OpenAI API key
client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])  # this is also the default, it can be omitted

@app.route('/')
def home():
    return "Welcome to the GPT Chatbot API!"

@app.route('/ask-gpt', methods=['POST'])
def ask_gpt():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"error": "No message provided"}), 400

        user_message = data['message']

        # Call the OpenAI GPT API (using the correct method for chat models)
        response = client.chat.completions.create(
            messages=[
                 {
                    "role": "user",
                 "content": user_message,
                 }
            ],
            model="gpt-4o",
            max_tokens=3000,  # Adjust the token limit based on your needs
            temperature=0.7  # Adjust the creativity of the responses
        )


        # Get the response content from OpenAI API
        reply = response.choices[0].message.content
        return jsonify({"reply": reply})

    except Exception as e:
        # Handle other exceptions
        return jsonify({"error": str(e)}), 500

@app.route('/list-models', methods=['GET'])
def list_models():
    try:
        # Retrieve the list of available models (use openai.Model.list())
        models = openai.Model.list()  # Changed to openai.Model.list()

        # Extract model names from the response and return them as a list
        model_names = [model.id for model in models['data']]  # Corrected how data is accessed
        return jsonify({"available_models": model_names})

    except openai.error.OpenAIError as e:
        # Handle OpenAI API errors
        return jsonify({"error": f"OpenAI error: {str(e)}"}), 500

    except Exception as e:
        # Handle other exceptions
        return jsonify({"error": str(e)}), 500


@app.route('/save_feedback', methods=['POST'])
def save_feedback():
    save_directory = "./feedback"
    os.makedirs(save_directory, exist_ok=True)
    try:
        # Get feedback from the POST request
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Save feedback as a JSON file
        feedback_file = os.path.join(save_directory, "feedback.json")
        with open(feedback_file, 'a') as f:
            json.dump(data, f)
            f.write('\n')  # Ensure entries are on separate lines

        return jsonify({"status": "Feedback saved successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)