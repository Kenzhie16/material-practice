import { useState, useEffect } from "react"
import { Button, TextField, List, ListItem, Typography} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';



export default function Cart() {
  const [input, setInput] = useState('')
  const [list, setList] = useState ([])
  const [total, setTotal] = useState(0)

  useEffect(()=>{
    return computeTotal()
  },[list])

  function handleAddOnClick() {
    const newItem = {
      itemName : input,
      quantity : 1,
      isSelected : false
    }
    // console.log(newItem)
    const newItems = [...list, newItem]
    setList(newItems)
    setInput('')
    // console.log(list)
    
  }

    const handleIncrement = (index) => {
      // console.log(index)
      const increaseItem = [...list]
      // increase quantity by 1
      increaseItem[index].quantity++
      setList(increaseItem)
      
    }

    const handleDecrement = (index) => {
      // console.log(index)
      const decreaseItem = [...list]
      // increase quantity by 1
      decreaseItem[index].quantity--
      setList(decreaseItem)
      
    }

    const handleComplete = (index) => {
      const itemTarget = [...list]
      itemTarget[index].isSelected = !itemTarget[index].isSelected
      setList(itemTarget)
    }

    const computeTotal = () => {
      const calculate = list.reduce((total, item) => {
        return total + item.quantity
      }, 0)
      setTotal(calculate) 
    }
    return(
        <>
            {/* <input type="text" onChange={(e) => setInput(e.target.value)} value={input}/> */}
            <div className="card-title">
                <Typography variant="h2">Wish List</Typography>
            </div>
            <TextField autoFocus="true" autoComplete label="Add Item" variant="outlined" size="small" onChange={(e) => setInput(e.target.value)} value={input} sx={{ padding : '20'}}></TextField>

            <Button variant="contained" size="large" color="success" onClick={() => handleAddOnClick()}><AddIcon/></Button>
            <List>
                {list.map((item, index) => (
                <ListItem alignItems='cebter'>
                    <input type="checkbox" onChange={()=>handleComplete(index)}></input>
                    <span style={{textDecoration: item.isSelected ? 'line-through' : ''}}>{item.itemName}</span>
                    <Button onClick={()=>handleDecrement(index)}>-</Button> 
                    {item.quantity}<Button onClick={()=>handleIncrement(index)}>+</Button>
                </ListItem>
            ))}
                <ListItem>
                    Total: {total}
                </ListItem>
            </List>
        </>
    )
}
