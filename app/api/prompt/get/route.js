import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req, context) => {
  try {
    await connectToDB();
    // const id = req.url.split("?")[1].split("=")[1];
    const data = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Unable to retrieve data" }), {
      status: 500,
    });
  }
};
