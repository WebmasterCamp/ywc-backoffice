interface MajorDetail {
  color: string
  name: string
  value: string
}

interface StepDetail {
  text: string
  value: string
}
export interface IQuestion {
  type: string
  title: string
  code?: string
  fileAccept?: string
  fileSize?: number
  options?: { title: string; value: string | number }[]
  relate?: { index: number; value: string | number }
}

export const QUESTION_TYPES = {
  FILE: 'file',
  LONG_TEXT: 'long_text',
  RADIO: 'radio',
  SHORT_TEXT: 'short_text',
}

export const MAJOR = (major: string | null): string => {
  const majors = [
    {
      color: 'purple',
      name: 'คอนเทนท์',
      value: 'content',
    },
    {
      color: 'magenta',
      name: 'ดีไซน์',
      value: 'design',
    },
    {
      color: 'volcano',
      name: 'มาร์เก็ตติ้ง',
      value: 'marketing',
    },
    {
      color: 'geekblue',
      name: 'โปรแกรมมิ่ง',
      value: 'programming',
    },
  ]

  const result = majors.find(
    (m: MajorDetail) => m.value === major?.toLowerCase()
  ) || {
    name: '',
  }

  return result.name
}

export const STEP = (step: string): string => {
  const steps = [
    {
      text: 'ข้อมูลส่วนตัว',
      value: 'info',
    },
    {
      text: 'ข้อมูลการติดต่อ',
      value: 'contact',
    },
    {
      text: 'คำถามกลาง',
      value: 'general',
    },
    {
      text: 'คำถามสาขา',
      value: 'major',
    },
    {
      text: 'สรุปข้อมูล',
      value: 'summary',
    },
  ]

  const result = steps.find(
    (s: StepDetail) => s.value === step.toLowerCase()
  ) || {
    text: '',
  }

  return result.text
}

export const GENERAL_QUESTION = [
  {
    title:
      '1. ถ้าน้อง ๆ อยู่ในโลกที่มีโรคซอมบี้ระบาดขั้นเริ่มต้น แต่รัฐบาลบอกว่าจะจัดการซอมบี้ให้ได้ภายใน 4 สัปดาห์ ระหว่างนั้นน้อง ๆ จะวางแผนการใช้ชีวิตหรือมีวิธีการจัดการยังไงเพื่อให้ตัวเองและคนในสังคมอยู่รอดจนกว่าจะถึงเวลาที่รัฐบาลจัดการกับปัญหาได้เรียบร้อย',
    type: QUESTION_TYPES.LONG_TEXT,
  },
  {
    title:
      '2. ในโลกหลัง COVID-19 ในแต่ละภาครัฐและเอกชนย่อมมีวิธีการปรับตัวในสถานการณ์ New Normal เพื่อมารับมือกับปัญหาที่เกิดขึ้น น้อง ๆ คิดว่ามี solution ไหนบ้าง ที่รู้สึกว่ายังสามารถพัฒนาได้ต่ออีก หรือน้อง ๆ สามารถคิดวิธีการใหม่ที่คิดว่าจะช่วยให้เกิดผลลัพธ์ที่ดีขึ้น พร้อมเหตุผล',
    type: QUESTION_TYPES.LONG_TEXT,
  },
  {
    title:
      '3. ให้น้อง ๆ เล่าประสบการณ์การทำงานที่รู้สึกว่าเป็นข้อผิดพลาด หรือมีอะไรที่ควรแก้ไขให้ดีขึ้นได้ และมีวิธีที่จะแก้ไขมันยังไง',
    type: QUESTION_TYPES.LONG_TEXT,
  },
  {
    title:
      '4. ค่าย YWC18 นี้สำคัญกับน้องยังไง ทำไมถึงสมัครเข้าร่วม และอะไรที่ทำให้เราต้องเลือกน้องมาอยู่ในค่าย',
    type: QUESTION_TYPES.LONG_TEXT,
  },
]

export const MAJOR_QUESTION = (major: string | null): IQuestion[] => {
  switch (major?.toLowerCase()) {
    case 'content':
      return [
        {
          options: [
            { title: 'คำถามที่ 1', value: 'คำถามที่ 1' },
            { title: 'คำถามที่ 2', value: 'คำถามที่ 2' },
          ],
          title: `ให้น้องเลือกตอบคำถาม 1 ข้อ<br/><br/>
          <u>คำถามที่ 1</u><br/>
          สมมุติว่าน้องทำงานอยู่ฝ่ายประชาสัมพันธ์ของกระทรวงหรือหน่วยงานภาครัฐใดก็ได้ เช่น กระทรวงศึกษาธิการ ธนาคารแห่งประเทศไทย การท่องเที่ยวแห่งประเทศไทย สำนักงานส่งเสริมเศรษฐกิจดิจิทัล ฯลฯ น้องได้รับมอบหมายให้ทำคอนเทนต์ประชาสัมพันธ์ผลงานของหน่วยงานลงบนโซเชียลมีเดีย เพื่อให้เยาวชนคนรุ่นใหม่รับรู้ถึงผลงานนี้ว่ามีประโยชน์ต่อพวกเขาอย่างไร<br/>
          ให้น้องสร้างสรรค์คอนเทนต์ประชาสัมพันธ์ตามโจทย์นี้ ลงบนพื้นที่โซเชียลมีเดียใดก็ได้ สามารถเปิดเป็นเพจใหม่ แชนแนลใหม่ หรือสร้างแอคเคาต์หลุม ที่ไม่เชื่อมโยงกับแอคเคาต์ที่น้องใช้งานอยู่เป็นประจำ สามารถแทรกภาพประกอบ, คลิปวิดีโอ หรือ multimedia ต่าง ๆ ได้ตามความเหมาะสม แล้วอัพโหลดคำตอบเป็นภาพ screen shot หรือไฟล์ pdf<br/><br/>
          <u>คำถามที่ 2</u><br/>
          ให้น้อง ๆ ทำคอนเทนต์นำเสนอให้คนรู้สึกอยากไปเที่ยวในจังหวัดภูเก็ตมากขึ้น โดยจะนำเสนอในแนวทางใดก็ได้ แต่ไม่ควรซ้ำกับคอนเทนต์เดิม ๆ ที่เคยผ่านมา และเน้นความคิดสร้างสรรค์มากเป็นพิเศษ<br/><br/>`,
          type: QUESTION_TYPES.RADIO,
        },
        {
          fileAccept: '.png,.jpg,.jpeg,.bmp,.pdf',
          fileSize: 25,
          title: `อัพโหลดไฟล์คำตอบ<br />
          <u>หมายเหตุ</u>
          ส่งคำตอบเป็นไฟล์นามสกุล .png, .jpg, .jpeg, .bmp, .pdf ขนาดไม่เกิน 25 MB`,
          type: QUESTION_TYPES.FILE,
        },
      ]
    case 'design':
      return [
        {
          fileAccept: '.png,.jpg,.jpeg,.bmp,.pdf',
          fileSize: 25,
          title: `1. ให้จัดทำ Infographic เพื่อเล่าว่า ทำไมน้องถึงควรได้รับการคัดเลือกเป็น 1 ใน YWC รุ่น 18 สาขา Web Design โดยมีเงื่อนไข ดังนี้<br />
          <li>ออกแบบและจัดทำด้วยตนเอง ในแบบที่สร้างสรรค์ มีเอกลักษณ์</li>
          <li>ขนาด 1280 x 1920 pixel จำนวน 1 ชิ้นงาน</li>
          <li>ผลงานต้องไม่ออกมา มีลักษณะเป็น Resume/Profile สำเร็จรูป</li>
          <li>ส่งคำตอบเป็นไฟล์นามสกุล .png, .jpg, .jpeg, .bmp, .pdf ขนาดไม่เกิน 25 MB</li>`,
          type: QUESTION_TYPES.FILE,
        },
        {
          title: `2. ให้ลองเสนอ 5 ไอเดียในฝัน ว่าภายในระยะ 10 ปีข้างหน้าจะมีเว็บหรือแอป Service อะไรได้ใหม่ จากผลของการเปลี่ยนแปลงพฤติกรรม, สถานการณ์, เทคโนโลยีในอนาคต<br />
          <u>ตัวอย่าง</u>
          <li>โรคระบาดต้องเว้นระยะห่างลดการเดินทาง + อินเทอร์เน็ตความเร็วสูงมีใช้กันทั่วถึง = การเกิดและเติบโตของแอป Online Conference</li>
          <li>โครงข่ายรถไฟฟ้ามากถึง 10 กว่าสายจะสร้างเสร็จ + เทคโนโลยีติดตาม/สแกนต่าง ๆ = แอปแนะนำเส้นทางการเดินทางอัตโนมัติ ตรวจสอบความหนาแน่น เวลาที่มาถึงของรถไฟ และส่งเสริมการค้ารอบสถานี</li>
          <li>เทคโนโลยีโดรนและอุปกรณ์ต่อขยายราคาถูกลงมาก + แนวคิดในการพัฒนาเกษตรกรรมไทย = โดรนที่ควบคุมผ่านแอป เพื่อติดตามและดูแลพืชไร่ พืชสวน ความชื้น อุณหภูมิ ศัตรูพืช ฯลฯ</li>`,
          type: QUESTION_TYPES.LONG_TEXT,
        },
        {
          fileAccept: '.pdf',
          fileSize: 25,
          title: `3. ให้ยกตัวอย่างเว็บหรือแอป Corporate/Brand พร้อมเขียนวิเคราะห์ข้อดี-ข้อด้อย ตามรายละเอียดดังนี้<br />
          <li>capture ภาพหน้าจอมา 1-3 รูป + เขียนสรุปข้อดี 3 ข้อ และข้อด้อย 3 ข้อ</li>
          <li>วิเคราะห์ให้เป็นรูปธรรมที่ลึกซึ้ง เกี่ยวข้องกับที่มาของการออกแบบ/ผลกระทบ/แนวทางแก้ไข</li>
          <li>ควรเลือกเว็บหรือแอปที่ได้รับการออกแบบอย่างมีคุณภาพ ไม่ควรวิเคราะห์เพียงผิวเผิน เช่น ออกแบบสวยดี, ใช้งานง่าย</li>
          <u>หมายเหตุ</u>
          <li>ส่งคำตอบเป็นไฟล์นามสกุล .pdf ขนาดไม่เกิน 25 MB</li>`,
          type: QUESTION_TYPES.FILE,
        },
        {
          fileAccept: '.pdf',
          fileSize: 25,
          title: `4. ส่ง Portfolio การออกแบบผลงานที่เคยทำมาใน 3 ขอบเขตนี้ ไม่จำกัดจำนวน<br />
          <li>เว็บหรือแอป Corporate/Brand</li>
          <li>เว็บหรือแอป Service</li>
          <li>Graphic Design</li>
          <u>หมายเหตุ</u>
          <li>ส่งคำตอบเป็นไฟล์นามสกุล .pdf ขนาดไม่เกิน 25 MB</li>
          <li>ไม่รับผลงาน 3D Model, Architectural Design, Movie Editing, Coding</li>`,
          type: QUESTION_TYPES.FILE,
        },
      ]
    case 'marketing':
      return [
        {
          options: [
            { title: 'เคย', value: 'เคย' },
            { title: 'ไม่เคย', value: 'ไม่เคย' },
          ],
          title: '1. น้องเคยเรียนวิชาทางการตลาดมาหรือไม่',
          type: QUESTION_TYPES.RADIO,
        },
        {
          relate: { index: 0, value: 'เคย' },
          title:
            '2.1 จงระบุชื่อวิชาทางการตลาดต่าง ๆ ที่ได้ศึกษามาแล้วในความเข้าใจของท่าน หรือที่ท่านคิดว่ามีความเกี่ยวข้องกับศาสตร์ทางการตลาด ไม่ว่าจะเป็นวิชาหลัก หรือวิชาเสริมในสถาบันการศึกษา',
          type: QUESTION_TYPES.LONG_TEXT,
        },
        {
          relate: { index: 0, value: 'เคย' },
          title:
            '2.2 จงอธิบายว่าจะทำอย่างไรในการทำแผนการตลาดเว็บไซต์ เพื่อช่วยเหลือทีมในค่ายให้เป็นผู้ชนะการแข่งขันได้',
          type: QUESTION_TYPES.LONG_TEXT,
        },
        {
          relate: { index: 0, value: 'ไม่เคย' },
          title: `2.1 จงอธิบายว่าจะทำอย่างไรในการทำแผนการตลาดเว็บไซต์ เพื่อช่วยเหลือทีมในค่ายให้เป็นผู้ชนะการแข่งขันได้ ทั้งที่ไม่ได้มีความรู้ทางการตลาดมาก่อน`,
          type: QUESTION_TYPES.LONG_TEXT,
        },
        {
          title:
            '3. จงอธิบายว่านักการตลาดคืออะไร มีหน้าที่อะไร แตกต่างหรือเหมือนกับนักการตลาดดิจิทัลอย่างไร',
          type: QUESTION_TYPES.LONG_TEXT,
        },
        {
          title:
            '4. ตำแหน่งนักการตลาดในทีมของ YWC มีหน้าที่ทำอะไร มีความสำคัญอย่างไรกับทีม ต้องทำอะไรบ้าง',
          type: QUESTION_TYPES.LONG_TEXT,
        },
        {
          title:
            '5. น้องคิดอย่างไรกับ "เว็บไซต์" ในยุคปัจจุบัน เว็บไซต์ยังมีความสำคัญอยู่ไหม อย่างไร ในยุคที่มีการเปลี่ยนแปลง พัฒนาทางเทคโนโลยี รวมทั้งการแพร่ระบาดของโควิดที่เกิดขึ้น',
          type: QUESTION_TYPES.LONG_TEXT,
        },
        {
          fileAccept: '.pdf',
          fileSize: 25,
          title: `6. แนบผลงานพร้อมอธิบายท้ายผลงานว่าน้องเคยมีประสบการณ์การทำงานด้านการตลาดอะไรบ้าง ผลออกมาเป็นอย่างไร​ และอยากปรับปรุงตรงไหนอีก<br />
            <u>หมายเหตุ</u>
            <li>ไฟล์นามสกุล .pdf ขนาดไม่เกิน 25 MB</li>`,
          type: QUESTION_TYPES.FILE,
        },
      ]
    case 'programming':
      return [
        {
          title:
            '1. ให้น้องเล่าประสบการณ์การทำงานเกี่ยวกับการทำหรือพัฒนาเว็บไซต์ รวมถึงเหตุผลที่ชอบการพัฒนาเว็บไซต์ (สามารถแปะลิงก์ผลงานที่เคยทำไว้ได้)',
          type: QUESTION_TYPES.LONG_TEXT,
        },
        {
          title:
            '2. ให้น้องเลือก Technology, Library หรือแนวคิดใหม่ ๆ ในการทำเว็บมาหนึ่งอย่างพร้อมกับอธิบายว่าคืออะไร และทำไมถึงตัดสินใจเลือกอันนี้',
          type: QUESTION_TYPES.LONG_TEXT,
        },
        {
          title:
            '3. ให้ออกแบบระบบกรอกและส่งใบสมัครค่าย YWC#19 พร้อมระบบตรวจใบสมัครโดยคณะกรรมการ โดยให้ระบุ Feature ที่อยากให้มี, เทคโนโลยีที่จะเลือกใช้, โครงสร้างของฐานข้อมูล และ wireframe ของหน้าจอแบบคร่าว ๆ',
          type: QUESTION_TYPES.LONG_TEXT,
        },
        {
          code: '<div id="wrapper" style="width: 100%;">\n    <div id="center">YWC#18</div>\n</div>',
          title:
            '4. จาก Code HTML ด้านล่างนี้ มี Code CSS ใดที่เป็นไปได้บ้าง ในการจัดให้ div#center อยู่ตรงกลางภายใน div#wrapper (สามารถตอบได้มากกว่า 1 รูปแบบ)',
          type: QUESTION_TYPES.LONG_TEXT,
        },
      ]
    default:
      return []
  }
}

// API Enum
export interface IEnum {
  description: string
  value: string
}
export const TRACKING_PURPOSE = [
  { description: 'แจ้งเตือนปิดรับสมัคร', value: 'remind_registration' },
  { description: 'แจ้งเตือนตัวจริง', value: 'remind_finalist' },
  { description: 'แจ้งปัญหาใบสมัคร', value: 'application_problem' },
]

export const TRACKING_RESULT = [
  { description: 'ติดต่อแล้ว', value: 'contacted' },
  { description: 'เบอร์ผิด', value: 'wrong number' },
  { description: 'ไม่รับสาย', value: 'not answer' },
  { description: 'ตัดสาย/รับสายแต่ไม่สะดวกคุย', value: 'busy' },
]

export const TRACKING_STATUS = [
  { description: 'รอดำเนินการ', value: 'pending' },
  { description: 'ติดต่อแล้ว', value: 'completed' },
]

export const TRACKING_GROUP = [
  { description: 'ไม่มี', value: 'no_group' },
  { description: 'สนใจสมัครค่าย', value: 'interested' },
  { description: 'ไม่สนใจสมัครค่าย', value: 'not interested' },
]
