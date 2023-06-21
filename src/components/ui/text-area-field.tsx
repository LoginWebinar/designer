interface ChildProps {
  value:string,
  title:string,
  onChange:(value:string)=>void,
  onBlur:(value:string)=>void,
}


export default function TextAreaField(props:ChildProps){
  return (
    
      <div className="rounded-md px-3 pb-3.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-600 focus-within:ring-2 focus-within:ring-indigo-600">
        <label htmlFor="name" className="block text-xs px-1.5 font-medium text-gray-200 mb-1">
          {props.title}
        </label>
        <textarea
          rows={4}
          name="name"
          value={props.value}
          className="block rounded-md px-1.5 w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          onChange={(e)=>props.onChange(e.currentTarget.value)}
          onBlur={(e)=>props.onBlur(e.currentTarget.value)}
        />
      </div>
    
  );
}