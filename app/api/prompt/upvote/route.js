import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const POST = async (req) => {
  try {
    await connectToDB();
    console.log("befo");

    const { id, upvotes } = await req.json();
    console.log(id, upvotes);
    const prompt = await Prompt.findByIdAndUpdate(id, { upvotes: upvotes });

    console.log("prompt");
    return new Response(
      JSON.stringify({ message: "Property updated successfully" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: "Unable to retrieve data" }), {
      status: 500,
    });
  }
};
