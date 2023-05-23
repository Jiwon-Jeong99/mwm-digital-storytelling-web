import { useEffect, useRef, useState } from 'react';
import { database } from '../firebase';
import { ref, push, onValue } from 'firebase/database';
import DataSphere from './DataSphere';

interface Message {
  name?: string;
  text: string;
  timestamp: number;
}

const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    //  파이어베이스에서 초기 데이터를 가져온다.
    const messageRef = ref(database, 'messages');
    onValue(messageRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data) {
        const messageList: Message[] = Object.values(data);
        setMessages(messageList);
      }
    });
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault(); // 새로고침 방지
    const input = inputRef.current?.value;
    const user = userRef.current?.value;

    if (input) {
      const newMessage: Message = {
        name: user,
        text: input,
        timestamp: Date.now(),
      };

      // message를 firebase에 넣기
      push(ref(database, 'messages'), newMessage);

      // clear input
      if (inputRef.current) {
        inputRef.current!.value = '';
        userRef.current!.value = '';
      }
    }
  };

  return (
    <div className="flex">
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span className="text-white">{message.name}: </span>
            <span className="text-white">{message.text}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <form>
          <input type="text" ref={userRef} className="flex outline-0 underline-offset-auto" />
          <input type="text" ref={inputRef} className="flex outline-0 underline-offset-auto" />
          <button type="submit" onClick={sendMessage} className="flex text-slate-100 ">
            확인
          </button>
        </form>
      </div>
      <div className="flex">
        <DataSphere />
      </div>
    </div>
  );
};

export default Input;
