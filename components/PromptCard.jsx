"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const auth = useSession()
  const [copied, setCopied] = useState("");

  const [postData, setPostData] = useState({
    creatorId: post?.creator?.id,
    prompt: post?.prompt,
    promptId: post?._id,
    tag: post?.tag,
    upvotes: post?.upvotes
  })

  const [isUpvoted, setIsUpvoted] = useState(false)

  const toggleUpvotes = (updatedUpvotes) => {
    setIsUpvoted((prev) => !prev)
    setPostData((prev) => ({ ...prev, upvotes: updatedUpvotes }))
  }

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const router = useRouter()

  useEffect(() => {
    if (postData?.upvotes?.filter((vote) => vote.userId === auth?.data?.user?.id).length !== 0) {
      setIsUpvoted(true)
      return;
    }
  }, [postData])

  const handleUpvote = async (id, upvotes, userId) => {
    let newUpvotes = []
    newUpvotes = [...postData.upvotes]
    if (auth.status === "unauthenticated") {
      alert('sign in first to upvote ')
      return;
    }


    if (isUpvoted) {
      const downvotes = newUpvotes.filter((vote) => vote.userId !== userId)
      newUpvotes = downvotes
    }
    else {
      newUpvotes.push({ userId })
    }

    try {

      const response = await fetch(`/api/prompt/upvote`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, upvotes: newUpvotes, userId }),
      });

      if (response.ok) {
        toggleUpvotes(newUpvotes)
      } else {
        console.log("Response not OK:", response.status);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
  }, [auth])
  return (
    <div className="promt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center justify-start flex-1 gap-3 cursor-pointer">

          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="object-contain rounded-full"
          />

          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 font-satoshi">
              {post.creator.username}
            </h3>
            <p className="text-sm text-gray-500 font-inter">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === post.PromptCard
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={12}
              height={12}
            />
          </div>
          <button className="flex items-center justify-start gap-1 " onClick={() => handleUpvote(post._id, post.upvotes, auth?.data?.user?.id)}>
            {isUpvoted ?
              <img src="/assets/icons/Upvoted.svg" className="w-6 h-6" alt="" />
              :
              <img src="/assets/icons/Upvote.svg" className="w-6 h-6" alt="" />
            }
            <span className="text-sm font-medium text-black">{postData.upvotes.length}</span>
          </button>
        </div>
      </div>

      <p className="my-4 text-sm text-gray-700 font-satoshi">{post.prompt}</p>
      <p
        className="text-sm cursor-pointer font-inter blue_gradient"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  );
};

export default PromptCard;
