import FloatingActionButtons from "../components/FloatingActionButtons.jsx"

const publicLayout = ({children})=> {
    return (
       <>
       <FloatingActionButtons />
       {children}
       </>
    )
}

export default publicLayout