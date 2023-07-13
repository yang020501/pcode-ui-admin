import { ChangeEvent } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef, useState, useEffect } from 'react';
interface SearchBarProps {
  data: Array<any>,
  placeholder: string,
  onsearch: Function,
  keyword: Array<any>

}
const SearchBar = (props: SearchBarProps) => {
  const cancelRef = useRef<HTMLDivElement>(null)

  const [inputSearch, SetInputSearch] = useState('')
  const { onsearch } = props

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    
    const searchWord = event.target.value;
    
    SetInputSearch(searchWord);
    let newFilter: Array<any> = []
    console.log(props.data)
    props.keyword.every(element => {
      newFilter = props.data.filter((value) => {
        
        return normalizeStr(value[element]).toLowerCase().includes(normalizeStr(searchWord).toLowerCase());
      });
    
      if (newFilter.length > 0)
        return false
      return true
    });

    if (searchWord === "") {
      props.onsearch([]);
    } else if (!(newFilter.length === 0)) {
      props.onsearch(newFilter);
    }

  };

  // chuẩn hóa chuỗi về dạng không dấu
  const normalizeStr = (str: string) => {
    return str.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }


  useEffect(() => {
    if (inputSearch !== "") {
      cancelRef.current ? cancelRef.current.classList.add('show') : null
    }
    else {
      cancelRef.current ? cancelRef.current.classList.remove('show') : null
      onsearch([]);
    }

  }, [inputSearch]);
  return (
    <div className="searchbar">
      <Paper
        // component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5, borderRightWidth: 2 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search ..."
          onChange={handleFilter}
          value={inputSearch}
          name="inputSearch"
        />
        <div className="searchbar-cancel" ref={cancelRef} onClick={() => SetInputSearch("")}>
          <IconButton sx={{ p: '10px' }} >
            <CancelIcon />
          </IconButton>
        </div>

      </Paper>
    </div>
  )
}



export default SearchBar
