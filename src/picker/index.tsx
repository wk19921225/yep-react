import * as React from 'react';

import Picker from '../picker-view/Picker';
import MultiPicker from '../picker-view/MultiPicker';
import noop from '../_utils/noop';
import treeFilter from '../_utils/arrayTreeFilter';
import Cascade from './Cascade';
import {PickerData} from '../picker-view';
import PickerPopup from './PickerPopup';

export interface PopupPickerProps {
  /**
   * 是否显示
   */
  show?: boolean;
  /**
   * 关闭事件回调
   */
  onCancel?: () => void;
  /**
   * 确定事件回调
   */
  onOk: (v:any) => void;
  onPickerChange: (v:any) => void;
  onVisibleChange: (visible: boolean) => void;
  prefixCls?: string;
  pickerPrefixCls?: string;
  style?: React.CSSProperties;
  data: PickerData[];
  cascade?: boolean;
  onChange: (v:any) => void;
  onLabelChange: (v:any) => void;
  cols?:number;
  /**
   * 默认选中的数据
   */
  defaultSelectedValue?: string | number;
  value: string[] | number[];
  format?: (value:any) => void;
  indicatorStyle?:React.CSSProperties;
  itemStyle?:React.CSSProperties;
}

export default class PopupPicker extends React.PureComponent<PopupPickerProps, any> {
  static defaultProps = {
    show: false,
    onCancel: noop,
    prefixCls: 'Yep-picker',
    pickerPrefixCls: 'Yep-picker-col',
    data: [],
    cascade: true,
  };

  scrollValue:any;

  getSel = (v:any) => {
    const value = this.scrollValue || v || [];
    console.log('---'+value)
    let treeChildren: PickerData[];
    const {data} = this.props;
    if (this.props.cascade) {
      treeChildren = treeFilter(data, (c: any, level: any) => {
        return c.value === value[level];
      });
    } else {
      // @ts-ignore
      treeChildren = value.map((v:any, i:number) => {
        return (data[i] as any ).filter((d:any) => d.value === v)[0];
      });
    }
    return (
      this.props.format ?
      this.props.format(
        treeChildren.map(v => {
          return v.label;
        })
      ):treeChildren.map(v => {
          return v.label;
        })
    );
  };

  getPickerCol = () => {
    const {data, pickerPrefixCls, itemStyle, indicatorStyle} = this.props;
    return data.map((col:any, index:number) => {
      return (
        <Picker
          key={index}
          prefixCls={pickerPrefixCls}
          style={{flex: 1}}
          itemStyle={itemStyle}
          indicatorStyle={indicatorStyle}
        >
          {col.map((item:any) => {
            return (
              <Picker.Item key={item.value} value={item.value}>
                {item.label}
              </Picker.Item>
            );
          })}
        </Picker>
      );
    });
  };

  onOk = (v: any) => {
    if (this.scrollValue !== undefined) {
      v = this.scrollValue;
    }
    if (this.props.onChange) {
      this.props.onChange(v);
    }
    if (this.props.onLabelChange) {
      this.props.onLabelChange(this.getSel(v));
    }
    if (this.props.onOk) {
      this.props.onOk(v);
    }
  };

  setScrollValue = (v: any) => {
    this.scrollValue = v;
  };

  setCascadeScrollValue = (v: any) => {
    // 级联情况下保证数据正确性，滚动过程中只有当最后一级变化时才变更数据
    if (v && this.scrollValue) {
      const length = this.scrollValue.length;
      if (length === v.length && this.scrollValue[length - 1] === v[length - 1]) {
        return;
      }
    }
    this.setScrollValue(v);
  };

  onPickerChange = (v: any) => {
    this.setScrollValue(v);
    if (this.props.onPickerChange) {
      this.props.onPickerChange(v);
    }
  };

  onVisibleChange = (visible: boolean) => {
    this.setScrollValue(undefined);
    if (this.props.onVisibleChange) {
      this.props.onVisibleChange(visible);
    }
  };

  render() {
    const {
      show,
      onCancel,
      pickerPrefixCls,
      prefixCls,
      cascade,
      data,
      cols,
      itemStyle,
      indicatorStyle,
      ...restProps
    } = this.props;

    const picker = cascade ? (
      <Cascade
        prefixCls={prefixCls}
        pickerPrefixCls={pickerPrefixCls}
        data={data}
        cols={cols}
        onChange={this.onPickerChange}
        onScrollChange={this.setCascadeScrollValue}
        pickerItemStyle={itemStyle}
        indicatorStyle={indicatorStyle}
      />
    ) : (
      <MultiPicker {...restProps} prefixCls={pickerPrefixCls} onScrollChange={this.setScrollValue}>
        {this.getPickerCol()}
      </MultiPicker>
    );

    return <PickerPopup onCancel={onCancel} show={show} onOk={this.onOk} picker={picker} />;
  }
}
