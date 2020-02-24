import React from "react";
import slugify from "react-slugify";

// !! CHANGE CONTACT FORM SO IT DOESNT GO ANYWHERE!!
export function Form({ form }) {
  return (
    <form
      name="contact"
      action={`https://formspree.io/${form.recipient}`}
      method="POST"
    >
      {form.fields.map(field => {
        if (field.inputType === "textarea") {
          return (
            <>
              <label for={slugify(field.label)}>{field.label}</label>
              <textarea
                cols="40"
                rows="5"
                name={slugify(field.label)}
                id={slugify(field.label)}
              ></textarea>
            </>
          );
        } else {
          return (
            <>
              <label for={slugify(field.label)}>{field.label}</label>
              <input
                id={slugify(field.label)}
                name={slugify(field.label)}
                type={field.inputType}
                autocorrect="off"
                autocomplete={field.autocomplete | ``}
              />
            </>
          );
        }
      })}
      {form.fields.length > 0 && (
        <button type="submit" value="Submit">
          Submit
        </button>
      )}
    </form>
  );
}

const base = {
  name: "customInput",
  key: "label",
  component: "group",
  fields: [
    { name: "label", label: "Label", component: "text" },
    { name: "inputType", label: "Input Type", component: "text" },
    { name: "autocomplete", label: "Autocomplete", component: "text" }
  ]
};

export const customInputBlock = {
  label: "Custom Input",
  ...base
};

export const nameInputBlock = {
  label: "Name Input",
  defaultItem: {
    label: "Name",
    inputType: "text",
    autocomplete: "name"
  },
  ...base
};

export const emailInputBlock = {
  label: "Email Input",
  defaultItem: {
    label: "Email",
    inputType: "text",
    autocomplete: "email"
  },
  ...base
};

export const phoneInputBlock = {
  label: "Phone Input",
  defaultItem: {
    label: "Phone",
    inputType: "text",
    autocomplete: "tel"
  },
  ...base
};

export const companyInputBlock = {
  label: "Company Input",
  defaultItem: {
    label: "Company",
    inputType: "text",
    autocomplete: "organization"
  },
  ...base
};

export const messageInputBlock = {
  label: "Message Input",
  defaultItem: {
    label: "Message",
    inputType: "textarea",
    autocomplete: ""
  },
  ...base
};

export const FormBlock = {
  label: "Form",
  key: "name",
  name: "form",
  component: "group",
  defaultItem: {
    name: "Form",
    recipient: "",
    fields: []
  },
  fields: [
    { name: "name", label: "Name", component: "text" },
    {
      name: "recipient",
      label: "Recipient",
      description: "Form is sent via formspree.io.",
      component: "text"
    },
    {
      label: "Fields",
      name: "fields",
      component: "blocks",
      templates: {
        customInputBlock,
        nameInputBlock,
        emailInputBlock,
        phoneInputBlock,
        companyInputBlock,
        messageInputBlock
      }
    }
  ]
};
