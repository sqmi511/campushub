import { useState } from "react";

type Event = { id: number; title: string; going: boolean };

export default function App() {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: "Welcome Day", going: false },
    { id: 2, title: "Coding Club", going: false },
  ]);
  const [text, setText] = useState("");

  const add = () => {
    if (!text.trim()) return;
    setEvents([...events, { id: Date.now(), title: text.trim(), going: false }]);
    setText("");
  };

  const toggle = (id: number) =>
    setEvents(events.map((e) => (e.id === id ? { ...e, going: !e.going } : e)));

  const remove = (id: number) => setEvents(events.filter((e) => e.id !== id));

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "left" }}>
      <h1>CampusHub</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && add()}
        placeholder="New event..."
      />
      <button onClick={add}>Add</button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {events.map((e) => (
          <li key={e.id} style={{ margin: "8px 0" }}>
            <input type="checkbox" checked={e.going} onChange={() => toggle(e.id)} />{" "}
            <span style={{ textDecoration: e.going ? "line-through" : "none" }}>
              {e.title}
            </span>{" "}
            <button onClick={() => remove(e.id)}>x</button>
          </li>
        ))}
      </ul>
      <p>
        Going: {events.filter((e) => e.going).length} / {events.length}
      </p>
    </div>
  );
}