import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const InquiryModal = ({ show, onHide }) => {
    const [userInfo, setUserInfo] = useState({
        id: '',
        name: '',
        email: '',
        phone: ''
    });
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [inquiryType, setInquiryType] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        if(user) {
            setUserInfo({
                id: user.id || '',
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('제출된 데이터: ', { ...userInfo, title, content, inquiryType });
        onHide();
    };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>문의하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicId" className='mb-3'>
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              placeholder="아이디"
              value={userInfo.id}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formBasicName" className='mb-3'>
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="이름"
              value={userInfo.name}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formInquiryType" className='mb-3'>
            <Form.Label>문의 종류</Form.Label>
            <Form.Select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              required
            >
              <option value="">선택하세요</option>
              <option value="가격">가격</option>
              <option value="객실">객실</option>
              <option value="시설">시설</option>
              <option value="기타">기타</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formBasicTitle" className='mb-3'>
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicContent" className='mb-3'>
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary"  onClick={handleSubmit} className='me-1'>
            제출
          </Button>
          <Button variant="secondary" onClick={onHide}>
            취소
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default InquiryModal