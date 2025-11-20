interface IProps
{
    msg?:string;
}

const ErrorMsg = ({msg}:IProps) => {
    return msg ? 
    <div className="px-4 py-2 mt-2 mb-0 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
        {msg}
    </div> :null;
}

export default ErrorMsg;