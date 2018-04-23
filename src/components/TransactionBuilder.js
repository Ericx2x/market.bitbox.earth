import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/styles/hljs';
import "../styles/docs.scss";
import {
  Link
} from 'react-router-dom';

class TransactionBuilder extends Component {
  componentDidMount() {
    document.title = "TransactionBuilder - BITBOX by EARTH - Supercharge your Bitcoin Cash workflow";
  }

  render() {
    return (
      <div className="TransactionBuilder">
        <h2 id='TransactionBuilder' className="content-head is-center"><i className="fas fa-exchange-alt" /> TransactionBuilder</h2>
        <div className="pure-menu pure-menu-horizontal breadcrumb">
          <ul className="pure-menu-list">
            <li className="pure-menu-item"><Link className="pure-menu-link" to="/">Home</Link></li>
            <li className="pure-menu-item"> > </li>
            <li className="pure-menu-item"><Link className="pure-menu-link" to="/bitboxcli/bitcoincash">bitbox-cli</Link></li>
            <li className="pure-menu-item"> > </li>
            <li className="pure-menu-item"><Link className="pure-menu-link" to="/bitboxcli/TransactionBuilder">TransactionBuilder</Link></li>
          </ul>
        </div>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h3 id='constructor'><code>constructor</code></h3>
            <p>
            Create new Transaction Builder.
            </p>
            <h4>Arguments</h4>
            <ol>
              <li>
          network <code>String</code>: Defaults to "bitcoincash"
              </li>
            </ol>
            <h4>Result</h4>
            <p>
          TransactionBuilder <code>TransactionBuilder</code>
            </p>
            <h4>Examples</h4>
            <SyntaxHighlighter language='javascript' style={ocean}>{`
  // instance of transaction builder
  let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');
            `}</SyntaxHighlighter>

            <h3 id='hashTypes'><code>hashTypes</code></h3>
            <p>
            BITBOX supports the <code>SIGHASH_ALL</code>, <code>SIGHASH_NONE</code> and <code>SIGHASH_SINGLE</code> hash types w/ the <code>SIGHASH_ANYONECANPAY</code> modifier.
            </p>
            <h4>Examples</h4>
            <SyntaxHighlighter language='javascript' style={ocean}>{`
  transactionBuilder.hashTypes
  // { SIGHASH_ALL: 1,
  //   SIGHASH_NONE: 2,
  //   SIGHASH_SINGLE: 3,
  //   SIGHASH_ANYONECANPAY: 128,
  //   SIGHASH_BITCOINCASH_BIP143: 64 }

  transactionBuilder.hashTypes.SIGHASH_ALL
  // 1

  // also has a DEFAULT_SEQUENCE of 0xffffffff
  transactionBuilder.DEFAULT_SEQUENCE
  // 4294967295
            `}</SyntaxHighlighter>

            <h3 id='addInput'><code>addInput</code></h3>
            <p>
            Add input to transaction
            </p>
            <h4>Arguments</h4>
            <ol>
              <li>
          txid <code>String</code>:               txid of vout
              </li>
              <li>
          index <code>Number</code>:              index of vout
              </li>
            </ol>
            <h4>Examples</h4>
            <SyntaxHighlighter language='javascript' style={ocean}>{`
  // txid of vout
  let txid = 'f7890915febe580920df2681d2bac0909ae89bd0cc1d3ed763e5eeba7f337f0e';
  // add input with txid and index of vout
  transactionBuilder.addInput(txid, 0);
            `}</SyntaxHighlighter>

            <h3 id='addOutput'><code>addOutput</code></h3>
            <p>
            Add output to transaction
            </p>
            <h4>Arguments</h4>
            <ol>
              <li>
          scriptPubKey <code>String</code>:               legacy/cashaddr address or script
              </li>
              <li>
          sendAmount <code>Number</code>:                amount to send in satoshis
              </li>
            </ol>
            <h4>Examples</h4>
            <SyntaxHighlighter language='javascript' style={ocean}>{`
  let originalAmount = 100000;
  let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
  // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
  let sendAmount = originalAmount - byteCount;
  // add output w/ address and amount to send
  transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);
            `}</SyntaxHighlighter>

            <h3 id='sign'><code>sign</code></h3>
            <p>
            Sign transaction
            </p>
            <h4>Arguments</h4>
            <ol>
              <li>
          vin <code>Number</code>:               vin to sign
              </li>
              <li>
          keyPair <code>ECPair</code>:                ECPair of HDNode
              </li>
              <li>
          redeemScript <code>Buffer</code>
              </li>
              <li>
          hashType <code>Number</code>
              </li>
              <li>
          originalAmount <code>Number</code>: satoshis in vin
              </li>
            </ol>
            <h4>Examples</h4>
            <SyntaxHighlighter language='javascript' style={ocean}>{`
  let originalAmount = 100000;
  // node of address which is going to spend utxo
  let hdnode = BITBOX.HDNode.fromXPriv("xprvA3eaDg64MwDr72PVGJ7CkvshNAzCDRz7rn98sYrZVAtDSWCAmNGQhEQeCLDcnmcpSkfjhHevXmu4ZL8ZcT9D4vEbG8LpiToZETrHZttw9Yw");
  // keypair
  let keyPair = BITBOX.HDNode.toKeyPair(hdnode);
  // empty redeemScript variable
  let redeemScript;
  // sign w/ keyPair
  transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
            `}</SyntaxHighlighter>

            <h3 id='build'><code>build</code></h3>
            <p>
            Build transaction
            </p>
            <h4>Result</h4>
            <p>
          Transaction <code>Object</code>:      Transaction
            </p>
            <h4>Examples</h4>
            <SyntaxHighlighter language='javascript' style={ocean}>{`
  // build tx
  let tx = transactionBuilder.build();
            `}</SyntaxHighlighter>

            <h3 id='toHex'><code>toHex</code></h3>
            <p>
            Return raw hex of transaction ready to be sent to the $BCH network
            </p>
            <h4>Result</h4>
            <p>
          rawHex <code>string</code>:      hex encoded raw transaction ready to be sent to the $BCH network
            </p>
            <h4>Examples</h4>
            <SyntaxHighlighter language='javascript' style={ocean}>{`
  // output rawhex
  let hex = tx.toHex();
  // 02000000010e7f337fbaeee563d73e1dccd09be89a90c0bad28126df200958befe150989f7000000006b48304502210085b8eb33f3981315bbe39c6810d0311c6cb39504914300ecd952cab8353222e202200ec95797c06ba8c9b15d59ab80e63300cb2371f67b3969d0b502d0fed733fbed4121025c85a571619e60fed412de0356b4e28f4f3670ab0c2b899dfe60e69aaa6cd4c0ffffffff01a6370000000000001976a91479d3297d1823149f4ec61df31d19f2fad5390c0288ac00000000
  // sendRawTransaction to running BCH node
  BITBOX.RawTransactions.sendRawTransaction(hex).then((result) => { console.log(result); }, (err) => { console.log(err); });
  // dfe54ec45c6fa2fa85b76d113de85b169d36902eaf6700f1cca21eed1392814b
            `}</SyntaxHighlighter>

            <h3 id='op_return'><code>OP_RETURN</code></h3>
            <p>
            Write data to the blockchain w/ <code>OP_RETURN</code>
            </p>
            <h4>Result</h4>
            <p>
          rawHex <code>string</code>:      hex encoded raw transaction ready to be sent to the $BCH network
            </p>
            <h4>Examples</h4>
            <SyntaxHighlighter language='javascript' style={ocean}>{`
  // encode some text as a buffer
  let buf = new Buffer('#BCHForEveryone');
  // create array w/ OP_RETURN code and text buffer and encode
  let data = BITBOX.Script.encode([
    BITBOX.Script.opcodes.OP_RETURN,
    buf
  ])
  // add encoded data as output and send 0 satoshis
  transactionBuilder.addOutput(data, 0)

  // later when you decode the raw hex of the tx you'll see this scriptPubKey
  "OP_RETURN 23424348466f7245766572796f6e65"

  // you can use BITBOX to decode it to the original text
  let fromAsm = BITBOX.Script.fromASM("OP_RETURN 23424348466f7245766572796f6e65")
  let decoded = BITBOX.Script.decode(fromAsm)
  decoded[1].toString('ascii')
  // #BCHForEveryone
            `}</SyntaxHighlighter>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionBuilder;
