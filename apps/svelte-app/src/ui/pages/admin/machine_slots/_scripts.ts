import dayjs from 'dayjs';
import { MachineSlot } from "@apps/core"

export const reload = (list: MachineSlot[]) => {
  if (!list || list.length === 0) {
    return { rows: 0, cols: 0, slots: [] }
  }

  let rows = 0;
  let cols = 0;
  let colIdx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  list.forEach(slots => {
    let index = parseInt(slots.code[1], 10);
    colIdx[index]++;
    if (cols < colIdx[index]) {
      cols = colIdx[index];
    }
    if (rows < index) {
      rows = index;
    }
  });

  return {
    rows,
    cols,
    slots: list.map(s => ({ ...s }))
  }
}

export const filterSlots = (origin: MachineSlot[], filter: any, layout: any): MachineSlot[] => {
  let filled = [];

  // filter stock
  if (filter.stock !== null) {
    let [cond, percent] = filter.stock.split(':');
    switch (cond) {
      case '<':
        origin = origin.filter(s => s.stock / s.capacity < percent);
        break;

      case '>':
        origin = origin.filter(s => s.stock / s.capacity > percent);
        break;

      case '<=':
        origin = origin.filter(s => s.stock / s.capacity <= percent);
        break;
    }
  }

  // filter edit
  if (filter.edit !== null) {
    origin = origin.filter(s => isEdited(s, layout.slots.find(ss => ss.id === s.id)) === filter.edit);
  }

  // filter status
  if (filter.enable !== null) {
    origin = origin.filter(s => s.is_enable === (filter.enable === true));
  }

  // filter search
  if (filter.search !== '') {
    origin = origin.filter(s => [s.code, s.product.name].join('|').indexOf(filter.search) !== -1);
  }

  for (let r = 0; r < layout.rows; r++) {
    for (let c = 0; c < layout.cols; c++) {
      const code = '0' + (r + 1) + c
      const slot = origin.find(s => s.code === code);
      if (slot === undefined) {
        filled.push({ code });
      } else {
        filled.push(slot);
      }
    }
  }

  return filled;
};


export const isEdited = (a: any, b: any) => {
  return JSON.stringify(a) !== JSON.stringify(b);
}

export const isPassed5Minutes = (date?: Date) => {
  return true
  if (!date) return true;
  if (dayjs().isAfter(dayjs(date).add(5, 'minute'), 'minute')) return true;
  return false;
};