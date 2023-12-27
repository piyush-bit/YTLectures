import React from 'react'

function JsonElement({data}) {
    if (Array.isArray(data)) {
        return (<div className='pl-5'>
            {data.map((e)=>{
                return <JsonElement data = {e}/>
            })}
        </div>);
    } else if (typeof data === 'object') {

        return(<div>
            {
                Object.entries(data).map(([key, value]) => {
                   return <div className='pl-5'>{key}:<JsonElement data={value}/></div>
                })
                
            }
        </div>)
    } 
  return (
    <div className='inline'>
    {data}
    </div>
  )
}

export default JsonElement