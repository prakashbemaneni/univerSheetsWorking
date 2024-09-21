import './index.css';
import { LocaleType, Univer, UniverInstanceType } from "@univerjs/core";
import { defaultTheme } from '@univerjs/design';
import { UniverDocsPlugin } from '@univerjs/docs';
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula';
import { DeviceInputEventType, UniverRenderEnginePlugin } from '@univerjs/engine-render';
import { SelectionMoveType, SetSelectionsOperation, UniverSheetsPlugin } from '@univerjs/sheets';
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula';
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui';
import { UniverDocsUIPlugin } from '@univerjs/docs-ui';
import { UniverUIPlugin } from '@univerjs/ui';
import { FUniver } from '@univerjs/facade';
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { zhCN, enUS } from 'univer:locales';

export const UniverSheet = forwardRef(({ data, onClick, onDbClick }, ref) => {
  const univerRef = useRef(null);
  const workbookRef = useRef(null);
  const containerRef = useRef(null);
  const fUniverRef = useRef(null);

  useImperativeHandle(ref, () => ({
    updateWorkbookData: (newData) => {
      console.log("Updating workbook data with:", newData);
      //workbookRef.current.load(newData);
      init(newData);
    }
  }));

  const init = (data = {}) => {
    const univer = new Univer({
      theme: defaultTheme,
      locale: LocaleType.ZH_CN,
      locales: {
        [LocaleType.ZH_CN]: zhCN
      },
    });
    univerRef.current = univer;

    // Register plugins
    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    univer.registerPlugin(UniverUIPlugin, { container: containerRef.current });
    univer.registerPlugin(UniverDocsPlugin, { hasScroll: false });
    univer.registerPlugin(UniverDocsUIPlugin);
    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);
    univer.registerPlugin(UniverSheetsNumfmtPlugin);

    // Create workbook instance
    workbookRef.current = univer.createUnit(UniverInstanceType.UNIVER_SHEET, data);
    fUniverRef.current = FUniver.newAPI(univer);
  };

  const destroyUniver = () => {
    univerRef.current?.dispose();
    univerRef.current = null;
    workbookRef.current = null;
  };

  const getData = () => {
    if (!workbookRef.current) {
      throw new Error('Workbook is not initialized');
    }
    return workbookRef.current.save();
  };

  useEffect(() => {
    console.log('loading data in useEffect: ', data)
    if (containerRef.current) {
      init(data);
    }

    return () => {
      destroyUniver();
    };
  }, []);

  useEffect(() => {
    if (workbookRef.current) {
      // Update the workbook data when the data prop changes
      workbookRef.current.load(data);
    }
  }, [data]);

  useEffect(() => {
    const handleCommandExecuted = (command) => {
      if (command.id === SetSelectionsOperation.id && command.params.type === SelectionMoveType.MOVE_END) {
        setTimeout(() => {
          onClick?.();
        }, 250);
      }

      if (command.id === 'sheet.operation.set-cell-edit-visible' && command.params.eventType === DeviceInputEventType.Dblclick) {
        onDbClick?.();
      }
    };

    fUniverRef.current?.onCommandExecuted(handleCommandExecuted);

    return () => {
      fUniverRef.current?.offCommandExecuted(handleCommandExecuted);
    };
  }, [onClick, onDbClick]);

  return <div ref={containerRef} className="univer-container"></div>;
});

export default UniverSheet;
