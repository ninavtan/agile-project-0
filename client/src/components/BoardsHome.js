import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';



const BoardsHome = () => {
  const boards = useSelector(state => state.boards.allBoards);

  // console.log(boards);

  return (
    <div>
      <h1>Boards Home</h1>
      {boards.map(board => (
        <Link
          style={{ margin: "1rem"}}  
          to={`/boards/${board._id}`}>{board._id}
        </Link>
      ))}
      <Outlet/>
    </div>
  )

};

export default BoardsHome;