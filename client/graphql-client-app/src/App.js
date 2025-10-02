import './App.css';
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const query = gql`
  query GEtTodoWithUser {
  getTodos {
  title
  user {
    name
  }
}
  }
`
function App() {

  const { data, loading } = useQuery(query);

  if(loading) return (<h1>loading</h1>)
console.log("data",data);
  return (
    <div className="App">
     <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">User</th>
            </tr>
          </thead>
          <tbody>
            {data.getTodos.map((todo, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{todo.title}</td>
                <td className="px-4 py-2 border">{todo.user?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default App;
