import { useEffect, useRef, useState } from "react";


const Description = ({description}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showreadMoreButton, setShowReadMoreButton] = useState(false);

  const ref = useRef(null)
  useEffect(()=>{
    if(ref.current){
      const isOverflowing = ref.current.scrollHeight != ref.current.clientHeight;
      setShowReadMoreButton(isOverflowing);
    }
  },[])

  return (
    <>
      <p className={`${isOpen ? 'line-clamp-none' : 'line-clamp-3'}`} ref={ref}>
        {description }
      </p>
      {showreadMoreButton &&  
        <button className="text-2xl text-green-600 font-bold hover:scale-105 transition-all duration-300" onClick={() => setIsOpen(!isOpen)} >
        {isOpen ? 'Read less...' : 'Read more...'}
      </button>}
    </>
  )
}

export default Description
