import { ArrowLeft } from "phosphor-react"
import { FormEvent, useState } from "react"
import { FeedbackType, feedbackTypes } from ".."
import { api } from "../../../services/api"
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading"
import { ScreenshotButton } from "../ScreenshotButton"

interface FeedbackContentStepProps {
  feedbackType: FeedbackType
  onFeedbackRestartRequest: () => void
  omFeedbackSend: () => void
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequest,
  omFeedbackSend
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [isSendingFeedback,setIssSendingFeedback]= useState(false)
  const [comment, setComment] = useState('')
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  const handleSubmitFeedback = async (event: FormEvent) => {
    event.preventDefault()
    setIssSendingFeedback(true)
    console.log('teste');
    
    await api.post('/feedbacks', {
      type: feedbackType,
      // screenshot,
      comment
    })
    setIssSendingFeedback(false)
    omFeedbackSend()
  }
  return (
    <>
      <header className="flex">
        <button type="button"
          className="top-5 left-5 absolute  text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequest}>
          <ArrowLeft weight="bold"
          />
        </button>
        <span className='text-xl leading-6 flex items-center gap-2'>
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className='w-6 h-6'
          />
          {feedbackTypeInfo.title}

        </span>
        <CloseButton />
      </header>
      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:outline-none focus:ring-1 resize-none scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent "
          placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton screenshot={screenshot} onScreenshotTook={setScreenshot} />
          <button
            type="submit"
            disabled={comment.length === 0}
            onClick={handleSubmitFeedback}
            className="disabled:opacity-50 disabled:hover:bg-brand-500 p-2 bg-brand-500 rounded-md border-transparent flex-1 justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
          >
           {isSendingFeedback?<Loading/>:'Enviar feedback'} 
          </button>
        </footer>
      </form>
    </>
  )
}