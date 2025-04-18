
'use client';
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const items = [
  "Sirius", "Betelgeuse", "Rigel", "Polaris", "Vega", "Altair", "Procyon", "Antares", "Deneb", "Arcturus",
  "Capella", "Spica", "Aldebaran", "Castor", "Pollux",
  "Orion", "Ursa Major", "Cassiopeia", "Scorpius", "Cygnus",
  "Leo", "Taurus", "Andromeda", "Pegasus", "Draco",
  "Lyra", "Aquarius", "Cancer", "Sagittarius", "Pisces",
  "Orion Nebula", "Andromeda Galaxy", "Pleiades", "Crab Nebula", "Ring Nebula",
  "Sombrero Galaxy", "Whirlpool Galaxy", "Lagoon Nebula", "Eagle Nebula", "Helix Nebula",
  "Triangulum Galaxy", "Horsehead Nebula", "Carina Nebula", "Centaurus A", "Large Magellanic Cloud"
];

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateCard() {
  const selected = shuffle(items).slice(0, 24);
  const card = [];
  let index = 0;
  for (let row = 0; row < 5; row++) {
    const rowItems = [];
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        rowItems.push("FREE SPACE");
      } else {
        rowItems.push(selected[index]);
        index++;
      }
    }
    card.push(rowItems);
  }
  return card;
}

export default function AstronomyBingo() {
  const [card, setCard] = useState(generateCard());
  const [marked, setMarked] = useState(() => Array(5).fill(null).map(() => Array(5).fill(false)));

  const toggleMark = (row, col) => {
    const updated = [...marked];
    updated[row][col] = !updated[row][col];
    setMarked(updated);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Astronomy Bingo</h1>
      <div className="grid grid-cols-5 gap-2">
        {card.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Card
              key={`${rowIndex}-${colIndex}`}
              onClick={() => toggleMark(rowIndex, colIndex)}
              className={\`cursor-pointer h-24 w-24 flex items-center justify-center text-center text-sm font-medium rounded-2xl shadow-md p-2 \${marked[rowIndex][colIndex] ? "bg-blue-500 text-white" : "bg-white"}\`}
            >
              <CardContent>{cell}</CardContent>
            </Card>
          ))
        )}
      </div>
      <Button className="mt-6" onClick={() => {
        setCard(generateCard());
        setMarked(Array(5).fill(null).map(() => Array(5).fill(false)));
      }}>
        New Card
      </Button>
    </div>
  );
}
