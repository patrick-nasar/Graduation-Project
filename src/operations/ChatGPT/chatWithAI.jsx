import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import chatbot from '../../img/chatbot.png'
import user from '../../img/user.png'
import api from '../../api/api'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ChatWithAI = () => {
    const id = useParams()
    const [chat, setchat] = useState([{ 'chat': 'Hello There. I am Sherlock your AI assistant', 'sender': 'pot' }])
    const [input, setinput] = useState('')
    const [view, setview] = useState(false)

    const handleinput = () => {
        setchat(prev => [...prev, { 'chat': input, 'sender': 'user' }])

        const value = { chat: input }
        api.post(`/autoMLCore/chat/chat_with_dataframe_test/${id.id}`, value)
            .then((res) => {
                setchat(prev => [...prev, { 'chat': res.data.result, 'sender': 'pot' }])
                console.log(res)
                setinput('')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        setview(false)
        setview(true)
    }, [chat])

    return (
        <div className="relative w-full h-[90dvh] py-5 text-white flex flex-col justify-center items-center text-center z-90 bg-gradient-to-tr from-[#de6161] to-[#2657eb]">
            {/* <div className='flex justify-center items-center py-5 space-x-3'>
                <h1 className=' text-3xl font-semibold'>Your AI Assistant</h1>
                <img src={chatbot} className='h-9 w-9' />
            </div> */}

            <div className=' w-1/2 h-full px-4 py-5 bg-white rounded-md hover:shadow-xl shadow-md space-y-2 backdrop-blur-md bg-opacity-10 dark:bg-[#1f2937]'>
                <div className='h-[88%] p-3 overflow-y-scroll space-y-5 overflow-x-hidden'>
                    {view ?
                        chat.map((line, index) => (
                            <div key={index}>
                                {line.sender === 'user' ?
                                    <div className='flex items-center justify-end space-x-3 animate-slide_right'>
                                        <p className='w-1/2 break-words text-right'>{line.chat}</p>
                                        <img src={user} className='h-9 w-9' />
                                    </div>

                                    :

                                    <div className='flex items-center justify-start space-x-3 animate-slide_left'>
                                        <img src={chatbot} className='h-9 w-9' />
                                        <p className='w-1/2 break-words text-left'>{line.chat}</p>
                                    </div>
                                }
                            </div>
                        ))
                        :
                        <div className='flex justify-center items-center'>
                            <p>start</p>
                        </div>
                    }
                </div>

                <div className='h-[12%] flex items-center px-1 border rounded-lg  py-2 space-x-4'>
                    <input
                        className='h-full w-full px-3 bg-transparent  dark:bg-[#374151] rounded-lg placeholder-white  focus:outline-none'
                        type="text"
                        placeholder=''
                        value={input}
                        onChange={e => setinput(e.target.value)}
                    />
                    <button
                        className='h-full border-l px-3 text-lg flex justify-center items-center space-x-2 hover:bg-slate-50 hover:rounded-full hover:text-black'
                        type='submit'
                        onClick={() => handleinput()}
                    >
                        {/* <p>Send</p> */}
                        <SendIcon fontSize='medium' />
                    </button>
                </div>



            </div>
            {/* <button
                type="button"
                className='text-xl w-9 h-12 bg-[#5582e4] rounded-lg focus:border-[#2563eb] focus:ring-[#2563eb]'
                onClick={() => console.log(id.id)}
            >
                Submit
            </button> */}
        </div>
    )
}
