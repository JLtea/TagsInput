import React, { useState, useEffect, useRef, useReducer } from 'react';
import { Tag } from 'antd';
import { TagWrapper, CustomInput } from './styles';
import { CloseCircleOutlined } from '@ant-design/icons';
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function reducer (errorMsg, action) {
    switch (action.type) {
        case 'format':
            return {error:'Please make sure label is in the correct format.'};
        case 'hotkey':
            return {error: 'That key already exists. Please choose a different label key.'};
        case 'tag':
            return {error: 'That label already exists. Please choose a different label.'};
        default:
          return {error: ''};
    }
}

const TagsInput = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [colors, setColors] = useState([]);
    const [hotkeys, setHotKeys] = useState([]);
    const inputRef = useRef(null);

    const [errorMsg, dispatch] = useReducer(reducer, {error: ''})
    function handleChange(e) {
        setNewTag(e.target.value);
    }
    function tagFormat(tag) {
        const pattern = /^[A-Za-z0-9\u3131-\uD79D,#$%]*@[A-Z]$/;
        return tag.match(pattern) != null;
    }
    function handleKeyDown(e) {
        if (e.keyCode == 32) { //space
            e.preventDefault();
        }
        dispatch({type: ''})
        if (e.keyCode===13 && e.target.value !== '') {
            const trimTag = newTag.trim();
            if (!tagFormat(trimTag)){
                dispatch({type: 'format'})
                return
            }
            const addTag = trimTag.substr(0,trimTag.length-2);
            if (tags.indexOf(addTag)===-1) {
                const tagKey = trimTag[trimTag.length-1];
                if (hotkeys.indexOf(tagKey) !== -1) {
                    dispatch({type: 'hotkey'})
                    return
                }
                setHotKeys([...hotkeys,tagKey]);
                setTags([...tags, addTag]);
                setColors([...colors, getRandomColor()]);
                setNewTag('');
                e.target.value = '';
            } else {
                dispatch({type: 'tag'});
            }
        }
    }
    const deleteTag = (e) => {
        let tag = e.currentTarget.textContent;
        tag = tag.substr(0,tag.length-2);
        let tagsCopy = tags;
        let hotkeysCopy=hotkeys;
        const index = tagsCopy.indexOf(tag);
        tagsCopy.splice(index, 1);
        hotkeysCopy.splice(index,1);
        setTags(tagsCopy);
        setHotKeys(hotkeysCopy);
        e.currentTarget.style.display = 'none';
    }
    // useEffect(()=>{
    //     let list = '';
    //     for (const idx in tags) {
    //         list = list.concat(parseInt(idx)+parseInt(1),':',tags[idx],'@',hotkeys[idx],' ');
    //     }
    //     setLabels(list.trim());
    // },[tags]);
    // useEffect(()=> {
    //     setTags([]);
    //     setHotKeys([]);
    //     setNewTag('');
    //     setColors([]);
    // },[reset])

    return(
        <div style={{width: '30%'}}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', justifyItems:'center'}}>
                <div style={{
                    display: 'inline-flex',
                    flexWrap: 'wrap',
                    padding: '5px',
                }}>
                    {tags.map((tag, index) => (
                        <TagWrapper key={tag} onClick={deleteTag}>
                            <Tag color={colors[index]}>
                                <span className="tag">{tag.concat('@',hotkeys[index])}</span>
                                <span className="x"><CloseCircleOutlined /></span>
                            </Tag>
                        </TagWrapper>
                    ))}
                    <CustomInput
                        ref={inputRef}
                        placeholder="+ Add Label"
                        type="text"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onBlur={()=>inputRef.current.value=''}
                    />
                </div>

            </div>
            <div style={{textAlign: 'center', color: 'gray'}}>
                Example: city@C / building@B / person@P
            </div>
            <div style={{ textAlign: 'center', color: 'red' }}>
                    {errorMsg.error}
            </div>
        </div>
    )
}

export default TagsInput;