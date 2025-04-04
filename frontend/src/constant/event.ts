export interface Label {
  label: string;
  value: string;
  type: string;
}

type Event = Label[];

export const events: Event = [
  {
    label: "Event Title",
    value: "title",
    type: "text",
  },
  {
    label: "Event Date",
    value: "date",
    type: "date",
  },
  {
    label: "Event Organizer",
    value: "organizer",
    type: "text",
  },
];

export const registerUser: Event = [
  {
    label: "Name",
    value: "name",
    type: "text",
  },
  {
    label: "Email",
    value: "email",
    type: "text",
  },
];
