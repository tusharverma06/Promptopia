import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="flex-col w-full max-w-lg flex-start">
      <h1 className="text-left head_text">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="max-w-md text-left desc">
        {type} and share amazing prompts with the worlds, and let your
        imagination go wild with any AI-powered platform.
      </p>

      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-2xl mt-10 gap-7 glassmorphism"
      >
        <label htmlFor="">
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Your AI Prompt
          </span>
          <textarea
            name=""
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            className="form_textarea"
            placeholder="Write your prompt"
          ></textarea>
        </label>
        <label htmlFor="">
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Tag
            <span>(#product, #web)</span>
          </span>
          <input
            name=""
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
            className="form_input"
            placeholder="#tag"
          />
        </label>

        <div className="gap-4 mx-3 mb-5 flex-end">
          <a href="/" className="text-sm te">
            Cancel
          </a>
          <button
            className="bg-primary-orange px-5 py-1.5 text-sm rounded-full text-white"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
