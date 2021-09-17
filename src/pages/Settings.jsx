import React, { useEffect, useState } from "react";
import { getFamily } from "../api/family/getFamily";
import { getUser } from "../api/getUser";
import InviteItem, { MyHeader } from "../components/ListViewCustomization";
import { ListView } from "@progress/kendo-react-listview";
import { useAppState } from "../state/state.context";
import AddFamilyDialog from "../components/settings/AddFamilyDialog";
import { createFamily } from "../api/family/createFamily";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { invite } from "../api/family/invite";

const emailRegex = new RegExp(/\S+@\S+\.\S+/);

const emailValidator = (value) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";

export default function Settings() {
  const [invitedFamilies, setInvitedFamilies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    state: { families, family, userId },
  } = useAppState();

  const handleCreateFamily = async (name) => {
    setShowModal(false);
    try {
      const res = await createFamily(name);
      console.log(res);
      if (res.status === "created") {
        window.location.reload();
      }
    } catch (e) {
      console.log(e, "error creating a family");
    }
  };

  useEffect(() => {
    console.log("user2", userId);
    const loadInvites = async () => {
      const user = await getUser(userId);
      console.log(user);
      if (user.invitedFamilies.lenght !== 0) {
        let inviteds = [];
        for (const invite of user.invitedFamilies) {
          inviteds.push(await getFamily(invite.id));
        }
        setInvitedFamilies(inviteds);
      }
    };
    if (userId) loadInvites();
  }, [families, userId]);

  const MyCustomItem = (props) => (
    <InviteItem
      {...props}
      families={invitedFamilies}
      setFamilies={setInvitedFamilies}
    />
  );

  const handleSubmit = async (dataItem) => {
    try {
      console.log("ERFDFSF");
      const res = await invite(families, dataItem.email);
      console.log(res);
      if (res.status === "invited") {
        console.log("he was invited");
        setErrorMessage("User was invited");
        console.log("invited");
      } else {
        if (res.message) setErrorMessage("user was not invited: ", res.message);
        else setErrorMessage("Something went wrong");
        console.log(res);
      }
    } catch (e) {
      if (e.message) {
        setErrorMessage("user was not invited: " + e.message);
        console.log(e.message);
      } else setErrorMessage("Something went wrong");
      console.log(e);
    }
  };

  return (
    <div className="p-2">
      {showModal && (
        <AddFamilyDialog
          handleCreateFamily={handleCreateFamily}
          title="Create Family"
          onClose={() => setShowModal(false)}
        >
          {" "}
        </AddFamilyDialog>
      )}
      {family ? <h4>My family: &nbsp;{family.name}</h4> : ""}

      {families ? (
        userId === family.owner ? (
          <Form
            className="k-form-inline"
            onSubmit={handleSubmit}
            render={(formRenderProps) => (
              <FormElement
                style={{
                  minWidth: 800,
                  maxWidth: 900,
                }}
                horizontal={true}
              >
                <fieldset className="k-form-fieldset ">
                  <legend>Invite a member</legend>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div className="">
                      <Field
                        name={"email"}
                        type={"email"}
                        component={Input}
                        label={"Email"}
                        validator={emailValidator}
                      />
                    </div>
                    <div className="k-form-buttons ml-1">
                      <button
                        className="ml-1 k-button"
                        type={"submit"}
                        disabled={!formRenderProps.allowSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <p className="p-2">
                    <b>{errorMessage}</b>
                  </p>
                </fieldset>
              </FormElement>
            )}
          />
        ) : (
          ""
        )
      ) : (
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Create Family
        </button>
      )}

      <ListView
        className="mt-2"
        setFamilies={setInvitedFamilies}
        header={MyHeader}
        data={invitedFamilies}
        item={MyCustomItem}
      />
    </div>
  );
}
