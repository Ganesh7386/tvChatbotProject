from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_openai import OpenAI  # Updated import path
from langchain.chains import create_sql_query_chain
from langchain_community.utilities import SQLDatabase
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

openai_api_key = os.getenv('sk-proj-PJBf7HE3H0elLzfsGnE6T3BlbkFJa0WuJnJ9gk7dFpXeyhcg')  # Use a proper environment variable key
if not openai_api_key:
    raise ValueError("No OpenAI API key found in environment variables")

llm = OpenAI(api_key=openai_api_key, model="gpt-3.5-turbo", temperature=0)
db = SQLDatabase.from_uri('sqlite:///YourDatabase.db')
chain = create_sql_query_chain(llm, db)

@app.route('/langchain', methods=['POST'])
def langchain():
    question = request.json.get('question')
    if not question:
        return jsonify({'error': 'No question provided'}), 400
    
    response = chain.invoke({"question": question})
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=8000)
