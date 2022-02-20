import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { FormControl, FormControlLabel,  RadioGroup, Radio } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";


class SelectBox extends React.Component {
  render() {
    let {isOnlyRice, isSpecial, degreePolishingUnder} = this.props.state
    return (
      <Box>
        <Box className="select-box-unit">
          <FormControl>
            <FormLabel>原材料に醸造アルコールが含まれているかどうか</FormLabel>
            <RadioGroup
              row
              name="group-is-only-rice"
              value={String(isOnlyRice)}
              onChange={(event) => this.props.onChangeRice(event.target.value)}
            >
              <FormControlLabel value="true" control={<Radio />} label="米とこうじのみ" />
              <FormControlLabel value="false" control={<Radio />} label="米とこうじと醸造アルコール" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box className="select-box-unit">
          <FormControl>
            <FormLabel>精米歩合はいくつか</FormLabel>
            <RadioGroup
              row
              name="group-polishing"
              value={degreePolishingUnder}
              onChange={(event) => this.props.onChangePolishing(event.target.value)}
            >
              <FormControlLabel value="50" control={<Radio />} label="50%以下" disabled={isSpecial} />
              <FormControlLabel value="60" control={<Radio />} label="60%以下" disabled={isSpecial} />
              <FormControlLabel value="70" control={<Radio />} label="70%以下" disabled={isSpecial} />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box className="select-box-unit">
          <FormControl>
            <FormLabel>特別な製造方法で醸されているか</FormLabel>
            <RadioGroup
              row
              name="group-is-special"
              value={String(isSpecial)}
              onChange={(event) => this.props.onChangeSpecial(event.target.value)}
            >
              <FormControlLabel value="true" control={<Radio />} label="特別な製造方法である" />
              <FormControlLabel value="false" control={<Radio />} label="特別な製造方法ではない" />
            </RadioGroup>
          </FormControl>
        </Box>

      </Box>
    );
  }
}


class SakeBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOnlyRice: false,
      isSpecial: false,
      degreePolishingUnder: 70,
    };
  }

  changeSpecial(flg) {
    this.setState({
      isSpecial: flg === "true",
    });
  }

  selectRice(flg) {
    this.setState({
      isOnlyRice: flg === "true",
    });
  }

  changePolishing(val) {
    this.setState({
      degreePolishingUnder: Number(val),
    });
  }

  buildName() {
    let partSpecial = '';
    let partRice = '';
    let partGinjo = '';

    partRice = this.state.isOnlyRice ? '純米' : '';

    if (this.state.isSpecial) {
      partSpecial = '特別';
      if (!this.state.isOnlyRice) {
        partGinjo = '本醸造'
      }
    } else {
      switch (this.state.degreePolishingUnder) {
        case 50:
          partGinjo = '大吟醸';
          break;
        case 60:
          partGinjo = '吟醸';
          break;
        default:
          partGinjo = this.state.isOnlyRice ? '' : '本醸造';
      }
    }

    return partSpecial + partRice + partGinjo + '酒';
  }

  render() {
    return (
      <Container maxWidth="sm" className="main">
        <h1>日本酒の特定名称チェッカー</h1>
        <Box className="select-box">
          <SelectBox state={this.state} onChangePolishing={(val) => this.changePolishing(val)} onChangeRice={(flg) => this.selectRice(flg)} onChangeSpecial={(cb) => this.changeSpecial(cb)} />
        </Box>
        <Box className="name-box">
          {this.buildName()}
        </Box>
      </Container>
    );
  }
}

ReactDOM.render(
  <SakeBase />,
  document.getElementById('root')
);

