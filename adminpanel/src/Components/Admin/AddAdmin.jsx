import React,{useState,useEffect} from "react";
import { Button } from "@mui/base";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from '../Axios';
import { Toast } from "../Toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Container,GlobalStyle,Header,
  HeaderIcon,
  HeaderText,
  HeaderField,
  HeaderButton,
  Menu,
  MenuItems,
  MenuHeader,
  MenuHeaderText,
  MenuHeaderIcon,
  MenuItemsText,
  MenuItemsInput,
  Buttons,
  SubmitButton,
  CancleButton} from '../../StyleComponent/AddAdmin';
  import NavBar from "../NavBar";
import { CheckRounded } from "@mui/icons-material";


const columns = [
  { id: 'slug', label: 'یوزرنیم', minWidth: 50,align:'center' },
  { id: 'parent', label: 'دسترسی ادمین', minWidth: 50,align:'center' },
  { id: 'delete', label: 'delete', minWidth:50, align:"center"}

];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}
export default function AddAdmin() {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const[checkedProducts,setCheckedProducts]=useState(false);
  const[checkedUser,setCheckedUser]=useState(false);
  const[checkedCategory,setCheckedCategory]=useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const fetchData = () => {
    axios
      .get("/category?size=50&page=1")
      .then(function (response) {
        console.log("Fetched data:", response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.error("Error:", error);
        Toast(error.response.data.errorMessage, false);
      });
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const[name,setName]=useState('');
  const[category,setCategory]=useState('');
  const[parent,setParent]=useState('');
  const[slug,setSlug]=useState('');

  const handleApiCategory=(e)=>{
    e.preventDefault();

    axios.post('http://api.talayto.com/v1/category',{
      name:name,
      category:category,
      parent:parent,
      slug:slug
    })
    .then(function(response){
      console.log("response:",response);
      if(response.status==200){
        toast.success("ادمین با موفقیت اضافه شد", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          rtl: true,
        });
      }
    })
     .catch(function(error){
      console.error("Error:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);

      }
     })
    

  }
  const handleButtonClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDelete = (categoryId) => {
    axios.delete(`/category/${categoryId}`)
      .then(function(response){
        console.log("Deleted successfully:", response);
        const newData = data.filter(item => item.id !== categoryId);
        setData(newData);
  
        toast.success("ادمین با موفقیت حذف شد", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          rtl: true,
        });
      })
      .catch(function(error){
        console.error("Error:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
        }
      });
  }
  
   
  
  
 
  
  return (
    <>
    <ToastContainer/>
    <Container>
      <GlobalStyle />
      <NavBar />
      <Header>
        <HeaderField>
          <HeaderIcon></HeaderIcon>
          <HeaderText>لیست ادمین ها</HeaderText>
        </HeaderField>
        <HeaderButton onClick={handleButtonClick}>اضافه کردن ادمین</HeaderButton>
      </Header>


    <Paper sx={{ width: '60%', overflow: 'hidden',marginTop:'3.3em',marginLeft:'33%',backgroundColor:'#283046'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,backgroundColor:'#343d55',color:'#D0D2D6' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody  style={{ color:'white' }} >
  {data
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
        {columns.map((column) => {
          if (column.id === 'delete') {
            return (
              <TableCell key={column.id} align={column.align}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>
              </TableCell>
            );
           
          }
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align} style={{ color: '#B4B7BD', borderColor: '#161e31' }}>
              {column.format && typeof value === 'number' ? column.format(value) : value}
            </TableCell>
          );
        })}
      </TableRow>
      );
    })}
</TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{color:'white'}}
      />
    </Paper>
      <Menu menuOpen={menuOpen}>
        <MenuHeader>
        <MenuHeaderText>اضافه کردن ادمین</MenuHeaderText>
        <MenuHeaderIcon></MenuHeaderIcon>
        </MenuHeader>
        <MenuItems>
        <MenuItemsText>یوزرنیم</MenuItemsText>
        <MenuItemsInput  type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        ></MenuItemsInput>
        </MenuItems>
        <MenuItems>
        <MenuItemsText>پسورد</MenuItemsText>
        <MenuItemsInput type="password"
         value={category}
         onChange={(e)=>setCategory(e.target.value)}
        ></MenuItemsInput>
        </MenuItems>
        <MenuItems>
        <MenuItemsText> دسترسی ادمین</MenuItemsText>
        
        </MenuItems>
        <MenuItems>
        <MenuItemsText>اضافه کردن محصول</MenuItemsText>
        <MenuItemsInput
        type="checkbox"
        checked={checkedProducts}
        onChange={(e)=>setCheckedProducts(e.target.value)}
        ></MenuItemsInput>
        </MenuItems>
        <MenuItems >
        <MenuItemsText> دسترسی به یوزر</MenuItemsText>
        <MenuItemsInput
        type="checkbox"
        checked={checkedUser}
        onChange={(e)=>setCheckedUser(e.target.value)}
        ></MenuItemsInput>
        </MenuItems>
        <MenuItems>
        <MenuItemsText $isCheckbox>دسترسی به کتگوری</MenuItemsText>
        <MenuItemsInput 
        type="checkbox"
        checked={checkedCategory}
        onChange={(e)=>setCheckedCategory(e.target.value)}
        ></MenuItemsInput>
        </MenuItems>
      <Buttons>
        <SubmitButton  onClick={handleApiCategory}>Submit</SubmitButton>
        <CancleButton onClick={handleButtonClick}>Cancle</CancleButton>
      </Buttons>
      </Menu>
    </Container>
    </>
  );

}