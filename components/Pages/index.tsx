import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles

  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      <Window title={"قیمت لحظه ای تتر (دلار)"} style={{
        minHeight: 200, margin: 10, width: "calc(100% - 20px)",
        backgroundColor: "#000000",
        background: "url('/stock.jpg')"
      }}>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>

          <div style={{ height: 100, width: 150, borderRadius: 10, backgroundColor: "#21289C", padding: "10px", margin: "10px" }}>
            <span style={{ color: "white" }}>قیمت لحظه ای:</span>
            <br-x />
            <span style={{ color: "white", fontFamily: "dig", fontSize: 40 }}>{props.p.price}</span>
          </div>

          <div style={{ height: 100, width: 150, borderRadius: 10, backgroundColor: "#880877", padding: "10px", margin: "10px" }}>
            <span style={{ color: "white" }}>تغییرات ۲۴ ساعته:</span>
            <br-x />
            <span style={{ color: "white", fontFamily: "dig", fontSize: 40 }}>{props.p.diff24d}%</span>
          </div>

          <div style={{ height: 100, width: 150, borderRadius: 10, backgroundColor: "#007635", padding: "10px", margin: "10px" }}>
            <span style={{ color: "white" }}>تغییرات هفتگی:</span>
            <br-x />
            <span style={{ color: "white", fontFamily: "dig", fontSize: 40 }}>{props.p.diff7d}%</span>
          </div>


          <div style={{ height: 100, width: 150, borderRadius: 10, backgroundColor: "#493B2C", padding: "10px", margin: "10px" }}>
            <span style={{ color: "white" }}>تغییرات ماهانه:</span>
            <br-x />
            <span style={{ color: "white", fontFamily: "dig", fontSize: 40 }}>{props.p.diff30d}%</span>
          </div>
        </div>

        <div style={{ width: "100%" , display:"flex", flex:1, alignItems:"center", justifyContent:"center", color:"white"}}>
          <center style={{ fontSize: 10, backgroundColor: "#251D1D", borderRadius: 5, width: 300, height:20, paddingTop:4 }}>
              مریم کاظمی -  تیم پژوهشی تورینگ - (پیکسل)
          </center>
        </div>

        <br-x />
        <br-x />


      </Window>

    </div>
  )
}


export async function getServerSideProps(context) {
  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let res = await fetch("https://api.tetherland.com/currencies")
  let data = await res.json()
  let p = data.data.currencies.USDT

  console.log("PRICEEEEEEEEEEEEEEEEEE:", p)

  return {
    props: {
      data: global.QSON.stringify({
        p,
        session,
        // nlangs,
      })
    },
  }
}