import React, { useEffect, useState } from "react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { array } from "firebase/firestore/pipelines";
import { FaRegEdit } from "react-icons/fa";
import { MdCancel, MdDelete } from "react-icons/md";

function TodoList() {
  const [task, settask] = useState();
  const [edit, setEdit] = useState();
  const [data, setData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setid] = useState(null);
 

  const db = getDatabase();

  const handleSubmit = (e) => {
    e.preventDefault();

    set(push(ref(db, "todo/")), {
      listName: task,
    });
    settask("");
  };

  // data read function

  useEffect(() => {
    const starCountRef = ref(db, "todo/");
    onValue(starCountRef, (snapshot) => {
      const arrey = [];

      // if(loginUser.uid === snapshot.val().uid)

      snapshot.forEach((element) => {
        arrey.push({ ...element.val(), id: element.key });
      });

      // if(loginUser.uid === arrey)
      // console.log(arrey);

      setData(arrey);
    });
  }, []);

  // handle delet function
  const handleDelet = (id) => {
    remove(ref(db, "todo/" + id));
  };

  // handle update function

  const handleUpdate = (id) => {
    setid(id);
    setShowEdit(!showEdit);
    
   

  };

  const handleEdit = (e) => {
    e.preventDefault();

    update(ref(db, "todo/" + id), {
      listName: edit,
    }).then(() => {
      setShowEdit(false);
      setEdit("");
    });
  };


  return (
    <section className="w-full h-full pt-10 relative">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <div className="px-4 py-2">
          <h1 className="text-gray-800 font-bold text-2xl uppercase">
            To-Do List
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm mx-auto px-4 py-2"
        >
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input
              onChange={(e) => settask(e.target.value)}
              value={task}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Add a task"
            />
            <button
              className="shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </form>

        {data.length > 0 && (
          <div className="mt-8">
            <ul className="bg-gray-300 p-6">
              {data.map((item) => (
                <li key={item.id} className="mb-3">
                  <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-md hover:bg-teal-600 duration-300">
                    <span className="text-lg font-semibold capitalize ">
                      {item.listName}
                    </span>
                    <div className="flex items-center gap-6">
                      <button>
                        <FaRegEdit
                          onClick={() => handleUpdate(item.id)}
                          className="text-black hover:text-white duration-300 cursor-pointer text-lg"
                        />
                      </button>
                      <button>
                        <MdDelete
                          onClick={() => handleDelet(item.id)}
                          className="text-black hover:text-red-600 duration-300 cursor-pointer text-lg"
                        />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {showEdit && (
        <div className="absolute w-full h-screen top-0 left-0 bg-gray-400">
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 relative">
            <div className="px-4 py-2">
              <h1 className="text-gray-800 font-bold text-2xl uppercase">
                To-Do List
              </h1>
            </div>
            <form
              onSubmit={handleEdit}
              className="w-full max-w-sm mx-auto px-4 py-2"
            >
              <div className="flex items-center border-b-2 border-teal-500 py-2">
                <input
                  onChange={(e) => setEdit(e.target.value)}
                  value={edit}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Add a task"
                
                />

                <input
                  type="submit"
                  value="update"
                  className="shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                />
              </div>
              <button
                onClick={() => setShowEdit(!showEdit)}
                className=" cursor-pointer border border-red-500 rounded-2xl absolute top-0 right-0"
              >
                <MdCancel className="text-2xl hover:text-red-500 duration-300" />
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default TodoList;
