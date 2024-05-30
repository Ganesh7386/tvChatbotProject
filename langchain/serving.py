from fastapi import FastAPI
from langchain.prompts import ChatPromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain_openai import OpenAI
from langserve import add_routes
import uvicorn
import os

openai_api_key   = os.getenv("OPENAI_API_KEY")

app = FastAPI(
    title = "Langchain server",
    version = "1.0",
    description = "A simple API server"
)

llm = OpenAI(api_key=openai_api_key, model="gpt-3.5-turbo", temperature=0)
db = SQLDatabase.from_uri('sqlite:///YourDatabase.db')
chain = create_sql_query_chain(llm, db)

prompt = ChatPromptTemplate.from_template("give me data related to customer with customer_id as {customer_id}")


add_routes(
    app,
    prompt|chain,
    path="/ask"
)

if __name__ == "__main__":
    uvicorn.run(app,host="localhost",port= 8000)





