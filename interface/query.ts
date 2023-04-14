import { makePdfChain } from "../lchain/llm"
import { OpenAIEmbeddings } from "langchain/embeddings"
import { PineconeStore } from "langchain/vectorstores"
import { pineconeClient } from "../pinecone/pineconeClient"


export default async function query(namespace, question, history) {
  
  if (!question) {
    return { message: "No question in the request" }
  }

  const pinecone = await pineconeClient();

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({}),
    {
        pineconeIndex: pinecone.Index(process.env.PINECONE_INDEX_NAME),
        textKey: "text",
        namespace,
    });

    return await createChainAndSendResponse(question, history,  vectorStore)
}

async function createChainAndSendResponse(question, history, vectorStore) {
    const sanitizedQuestion = question.trim().replaceAll("\n", " ")
    const chain = makePdfChain(vectorStore); 
    return await chain.call({
        question: sanitizedQuestion,
        chat_history: history || [],
      });
  }
  