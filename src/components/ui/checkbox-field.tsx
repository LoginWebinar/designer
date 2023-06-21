interface ChildProps {
  checked:boolean,
  details:string,
  title:string,
  onChange:(value:boolean)=>void,
}


export default function CheckBoxField(props:ChildProps){
  return (
    <div className="relative flex gap-x-3">
      <div className="flex h-6 items-center">
        <input
          name="ckbox"
          type="checkbox"
          checked={props.checked}
          onChange={(e)=>props.onChange(e.currentTarget.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="text-sm leading-6">
        <label htmlFor="ckbox" className="font-medium text-gray-200">
          {props.title}
        </label>
        <p className="text-gray-300">{props.details}</p>
      </div>
    </div>
  )
}