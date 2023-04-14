import { PineconeClient } from "@pinecone-database/pinecone"

export async function pineconeClient() {
  let p =  new PineconeClient();
  await p.init({
    environment: process.env.PINECONE_ENVIRONMENT ?? "", 
    apiKey: process.env.PINECONE_API_KEY ?? "",
  });
  return p;
}