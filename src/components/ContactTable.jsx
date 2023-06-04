import React from "react";
import { Input, Loader, Table } from "@mantine/core";
import Cookies from "js-cookie";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contactApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addContacts, setSearchTerm } from "../redux/services/contactSlice";
import { Menu, Button, rem } from "@mantine/core";

const ContactTable = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  console.log("dc",data?.contacts?.data);

  const [deleteContact] = useDeleteContactMutation();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactSlice.contacts);
  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const { data } = await deleteContact({ id, token });
        console.log(data);
      }
    });
  };

  useEffect(() => {
    dispatch(addContacts(data?.contacts?.data));
  }, [data]);

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <Loader variant="dots" />
      </div>
    );
  }

  const rows = contacts
    ?.filter((item) => {
      if (searchTerm === "") {
        return item;
      } else if (
        item?.name.toLowerCase().includes(searchTerm?.toLocaleLowerCase())
      ) {
        return contacts;
      }
    })
    .map((contact) => (
      <tr key={contact.id}>
        <td>{contact?.name}</td>
        <td>
          {contact?.email === null ? "example@gmail.com" : contact?.email}
        </td>
        <td>{contact?.phone}</td>
        <td>{contact?.address === null ? "Ygn" : contact?.address}</td>
        <td className=" flex justify-center">
          <Menu width={200} shadow="md">
            <Menu.Target>
              <Button variant="outline">...</Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item component="a">
                <p
                  onClick={() => deleteHandler(contact?.id)}
                  className=" cursor-pointer text-red-600 "
                >
                  Delete
                </p>
              </Menu.Item>

              <Link to={`/user/${contact?.id}`}>
                <Menu.Item component="a" target="_blank">
                  <p>User Info</p>
                </Menu.Item>
              </Link>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));

  return (
    <>
      <div className="mt-10 flex items-center gap-2">
        <Link to={"/create"}>
          <button className=" bg-blue-700 text-white px-4 py-1">
            Create Contact
          </button>
        </Link>
        <Input
          variant="filled"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      <div className="mt-20">
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {rows}
            {/*
            data?.contacts?.data?.map((contact) => {
              return (
                <tr key={contact.id}>
                  <td>{contact?.name}</td>
                  <td>
                    {contact?.email === null
                      ? "example@gmail.com"
                      : contact?.email}
                  </td>
                  <td>{contact?.phone}</td>
                  <td>
                    {contact?.address === null ? "Ygn" : contact?.address}
                  </td>
                  <td className=" flex justify-center">
                    <p className=" cursor-pointer border-2 border-blue-700 w-4">
                      ...
                    </p>
                  </td>
                </tr>
              );
            })
            */}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ContactTable;
