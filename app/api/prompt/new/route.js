import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";
export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 200 });
    // res.status(200).json(JSON.stringify(newPrompt));
  } catch (error) {
    // res.status(500).send("Create Prompt Failed");

    return new Response("Create Prompt failed");
  }
};
