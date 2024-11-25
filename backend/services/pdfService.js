// services/pdfService.js

import fs from 'fs';
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
var vectorStore; // Store the vector store in memory

async function getEmbeddings(filename) {
    console.log(process.env.OPENAI_API_KEY)
    const fileBaseName = filename.split(".")[0];
    const filePath = `./${fileBaseName}.pkl`;
    console.log(process.env.HUGGINGFACE_API_KEY)
    if (fs.existsSync(filePath)) {
        console.log("File exists, loading vector store.");
        return await FaissStore.load(filePath, new HuggingFaceInferenceEmbeddings({
            apiKey: process.env.HUGGINGFACE_API_KEY,
        }));
    } else {
        console.log("File does not exist, loading new document.");
        const loader = new PDFLoader(`./${filename}`, { parsedItemSeparator: "" });
        const docs = await loader.load();

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 512,
            chunkOverlap: 50,
        });
        const allSplits = await splitter.splitDocuments(docs);

        const inMemoryVectorStore = await FaissStore.fromDocuments(
            allSplits,
            new HuggingFaceInferenceEmbeddings({
                apiKey: process.env.HUGGINGFACE_API_KEY,
            })
        );
        
        await inMemoryVectorStore.save(filePath);
        return inMemoryVectorStore;
    }
}

export async function uploadPDF(filename) {
    vectorStore = await getEmbeddings(filename); // Store the vector store in memory for querying later
    return { message: "PDF uploaded and processed successfully." };
}
    
export async function queryPDF(question) {
    const filename="SE Unitwise imp questions.pdf"
    // console.log(process.env.OPENAI_API_KEY)
    // return filename
    console.log("Using Hugging Face Token:", process.env.HUGGINGFACE_API_KEY ? "Token found" : "Token missing");
    vectorStore = await getEmbeddings(filename);
    console.log("here")
    if (!vectorStore) {
        throw new Error("No vector store available. Please upload a PDF first.");
    }

    const vectorStoreRetriever = vectorStore.asRetriever({ k: 3 ,searchType: "similarity"

    });
    console.log(vectorStoreRetriever)
    console.log(question)
    

    const llm = new ChatOpenAI({
        apiKey:process.env.OPENAI_API_KEY,
        model: "gpt-4o-mini",    
        temperature: 0,
    });

    const customTemplate = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.
{context}

Question: {question}

Helpful Answer:`;

    const customRagPrompt = PromptTemplate.fromTemplate(customTemplate);
    
    const context = await vectorStoreRetriever.invoke(question);
    
    const customRagChain = await createStuffDocumentsChain({
        llm: llm,
        prompt: customRagPrompt,
    });

    const res = await customRagChain.invoke({
        question: question,
        context,
    });
    // let res="hello"
    console.log(res)

    return res;
}
