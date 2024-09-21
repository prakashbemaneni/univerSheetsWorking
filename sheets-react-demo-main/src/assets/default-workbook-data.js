import { BooleanNumber, DEFAULT_WORKSHEET_ROW_COUNT, SheetTypes, LocaleType } from '@univerjs/core';

/**
 * Function to get the workbook data for comparing two users.
 * @param {Object} user1 - First user data.
 * @param {Object} user2 - Second user data.
 * @returns {Object} Workbook data for Universheet comparison
 */
export const getDefaultWorkbookData = (user1, user2) => {
  return {
    id: 'workbook-01',
    locale: LocaleType.ZH_CN,
    name: 'universheet',
    sheetOrder: ['sheet-01'],
    sheets: {
      'sheet-01': {
        type: SheetTypes.GRID,
        id: 'sheet-01',
        name: 'Comparison Sheet',
        cellData: {
          0: {
            0: { v: 'Category' },
            1: { v: 'Attribute' },
            2: { v: user1.name },
            3: { v: user2.name },
          },
          1: { 0: { v: 'UserInfo' }, 1: { v: 'Name' }, 2: { v: user1.name }, 3: { v: user2.name } },
          2: { 1: { v: 'Address 1' }, 2: { v: user1.address1 }, 3: { v: user2.address1 } },
          3: { 1: { v: 'Address 2' }, 2: { v: user1.address2 }, 3: { v: user2.address2 } },
          4: { 1: { v: 'Contact' }, 2: { v: user1.contact }, 3: { v: user2.contact } },
          5: { 0: { v: 'DeviceInfo' }, 1: { v: 'Device Name' }, 2: { v: user1.deviceName }, 3: { v: user2.deviceName } },
          6: { 0: { v: 'PlansInfo' }, 1: { v: 'Current Plan' }, 2: { v: user1.currentPlan }, 3: { v: user2.currentPlan } },
        },
        merges: [
          { startRow: 1, startCol: 0, endRow: 4, endCol: 0 }, // Merging 'UserInfo' Category
          { startRow: 5, startCol: 0, endRow: 5, endCol: 0 }, // Merging 'DeviceInfo'
          { startRow: 6, startCol: 0, endRow: 6, endCol: 0 }, // Merging 'PlansInfo'
        ],
        name: 'sheet1',
        tabColor: 'red',
        hidden: BooleanNumber.FALSE,
        // rowCount: Object.keys(cellData).length,
        // columnCount: Math.max(...Object.keys(cellData).map(row => Object.keys(cellData[row]).length)),
        rowCount: 20,
        columnCount: 6,
        zoomRatio: 1,
        scrollTop: 200,
        scrollLeft: 100,
        defaultColumnWidth: 93,
        defaultRowHeight: 27,
        status: 1,
        showGridlines: 1,
        hideRow: [],
        hideColumn: [],
        rowHeader: {
          width: 46,
          hidden: BooleanNumber.FALSE,
        },
        columnHeader: {
          height: 20,
          hidden: BooleanNumber.FALSE,
        },
        selections: ['A2'],
        rightToLeft: BooleanNumber.FALSE,
        pluginMeta: {},      },
    },
  };
};
