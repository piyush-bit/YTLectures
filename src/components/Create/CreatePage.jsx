import React, { useState } from 'react'
import JsonElement from './JsonElement';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

import DetailPage from '../DetailPage/DetailPage';

function CreatePage() {

  const [input , setInput] = useState();
  const [json , setJson] = useState(false);
 
  const onChangeHandler = (e)=>{
      setInput(e.target.value);
      try {
        setJson(JSON.parse(e.target.value))
        console.log(json)
      } catch (error) {
        setJson(false)
        
      }
  }

  return (
    <div>
      <div>
        <p>enter json</p>
      <input className='outline  resize' onChange={onChangeHandler} value={input} type="text" name="" id="" />
    
     { json &&<JSONInput
        id          = 'a_unique_id'
        placeholder = { json }
        locale      = { locale }
        height      = '550px'
    />}
      </div>

      <div>
        {
          
           json &&(<div className='h-screen w-screen'>
          <DetailPage data={json}/>
          {/* <JsonElement data={json}/>  */}
        </div>)
          }
        
        
      </div>
    </div>
  )
}

export default CreatePage