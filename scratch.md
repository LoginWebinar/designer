  <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
      <label htmlFor="name" className="block text-xs font-medium text-gray-900">
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={title}
        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        placeholder="Title"
      />
    </div>


    {avatarData !== undefined ? avatarData[0].description : null }
          {avatarData !== undefined && avatarData.map((avatar,index)=>(
            <li key={avatar.id}>{avatar.description}</li>
          ))}

          {avatarData?.map((avatar,index)=>(
            <li key={avatar.id}>{avatar.description}</li>
          ))}


          { selectedAssetLayers && 
                      <SortableList 
                        items={selectedAssetLayers} 
                        onChange={(e)=>updateAssetLayerOrder(e)}
                        renderItem={item=>{
                          return <>
                            <SortableList.Item id={item.id}>
                              <div className="grid grid-cols-3 gap-2 max-w-[300px]">
                                <div>
                                  <p className="text-xs">{item.type}</p>
                                  <button
                                    value={item.id}
                                    type="button"
                                    className="rounded-full bg-orange-600 px-2.5 py-.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={(e)=>{
                                      let id= parseInt(e.currentTarget.value);
                                      deleteAssetLayerData(id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              
                                
                                <div className="grid grid-rows-3 gap-2 ml-3">
                                 
                                </div>
                              </div>
                              
                              <SortableList.DragHandle />
                            </SortableList.Item>
                          </>
                          }
                        }
                      />
                    }