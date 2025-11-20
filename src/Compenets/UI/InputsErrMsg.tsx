interface IProps
{
    msg?:string;
}

const InputsErrMsg = ({msg}:IProps) => {
    return msg ? 

    <span className="text-sm text-red-800">{msg}</span>:null
    
}

export default InputsErrMsg;