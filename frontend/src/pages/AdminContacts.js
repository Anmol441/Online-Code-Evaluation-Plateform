import React, { useEffect, useState } from 'react';

const AdminContacts = () => {

  // ==============================
  // STATES
  // ==============================
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState({});
  const [loading, setLoading] = useState(true);


  // ==============================
  // FETCH MESSAGES
  // ==============================
  const fetchMessages = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        'http://localhost:5000/api/contact',
        {
          method: 'GET',

          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const data = await response.json();

      console.log('API RESPONSE:', data);

      // SAFE CHECK
      if (data.success && Array.isArray(data.data)) {

        setMessages(data.data);

      } else {

        setMessages([]);
      }

    } catch (error) {

      console.log('FETCH ERROR:', error);

      setMessages([]);

    } finally {

      setLoading(false);
    }
  };


  // ==============================
  // LOAD ON PAGE START
  // ==============================
  useEffect(() => {
    fetchMessages();
  }, []);


  // ==============================
  // SEND REPLY
  // ==============================
  const sendReply = async (id) => {

    try {

      if (!replies[id]) {
        return alert('Please write a reply');
      }

      const response = await fetch(
        `http://localhost:5000/api/contact/${id}/reply`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${localStorage.getItem('token')}`
          },

          body: JSON.stringify({
            reply: replies[id]
          })
        }
      );

      const data = await response.json();

      alert(data.message);

      // REFRESH DATA
      fetchMessages();

      // CLEAR REPLY BOX
      setReplies({
        ...replies,
        [id]: ''
      });

    } catch (error) {

      console.log(error);

      alert('Failed to send reply');
    }
  };


  return (

    <div
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        padding: '40px'
      }}
    >

      {/* ============================== */}
      {/* HEADER */}
      {/* ============================== */}

      <div
        style={{
          marginBottom: '30px'
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#111827'
          }}
        >
          Contact Messages
        </h1>

        <p
          style={{
            color: '#6b7280',
            marginTop: '8px'
          }}
        >
          Manage and reply to user support messages
        </p>
      </div>


      {/* ============================== */}
      {/* LOADING */}
      {/* ============================== */}

      {loading ? (

        <div
          style={{
            textAlign: 'center',
            marginTop: '100px',
            fontSize: '20px'
          }}
        >
          Loading messages...
        </div>

      ) : (

        <>
          {/* ============================== */}
          {/* NO MESSAGES */}
          {/* ============================== */}

          {messages?.length === 0 ? (

            <div
              style={{
                background: '#fff',
                padding: '40px',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
              }}
            >
              <h2>No Messages Found</h2>
            </div>

          ) : (

            <>
              {/* ============================== */}
              {/* MESSAGE LIST */}
              {/* ============================== */}

              {messages?.map((msg) => (

                <div
                  key={msg._id}
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '25px',
                    marginBottom: '25px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                  }}
                >

                  {/* USER INFO */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}
                  >

                    <div>
                      <h2
                        style={{
                          fontSize: '22px',
                          color: '#111827'
                        }}
                      >
                        {msg.name}
                      </h2>

                      <p
                        style={{
                          color: '#6366f1',
                          marginTop: '5px'
                        }}
                      >
                        {msg.email}
                      </p>
                    </div>


                    <div>

                      <span
                        style={{
                          padding: '8px 15px',
                          borderRadius: '30px',
                          fontSize: '14px',
                          fontWeight: '600',
                          background:
                            msg.replied
                              ? '#dcfce7'
                              : '#fee2e2',

                          color:
                            msg.replied
                              ? '#166534'
                              : '#991b1b'
                        }}
                      >
                        {
                          msg.replied
                            ? 'Replied'
                            : 'Pending'
                        }
                      </span>

                    </div>

                  </div>


                  {/* USER MESSAGE */}
                  <div
                    style={{
                      background: '#f9fafb',
                      padding: '20px',
                      borderRadius: '15px',
                      marginBottom: '20px'
                    }}
                  >

                    <h4
                      style={{
                        marginBottom: '10px',
                        color: '#111827'
                      }}
                    >
                      User Message
                    </h4>

                    <p
                      style={{
                        color: '#374151',
                        lineHeight: '1.7'
                      }}
                    >
                      {msg.message}
                    </p>

                  </div>


                  {/* OLD REPLY */}
                  {msg.reply && (

                    <div
                      style={{
                        background: '#eef2ff',
                        padding: '20px',
                        borderRadius: '15px',
                        marginBottom: '20px'
                      }}
                    >

                      <h4
                        style={{
                          marginBottom: '10px',
                          color: '#4338ca'
                        }}
                      >
                        Admin Reply
                      </h4>

                      <p
                        style={{
                          color: '#312e81',
                          lineHeight: '1.7'
                        }}
                      >
                        {msg.reply}
                      </p>

                    </div>

                  )}


                  {/* REPLY BOX */}
                  <textarea
                    placeholder="Write your reply here..."
                    value={replies[msg._id] || ''}
                    onChange={(e) =>
                      setReplies({
                        ...replies,
                        [msg._id]: e.target.value
                      })
                    }
                    style={{
                      width: '100%',
                      height: '140px',
                      borderRadius: '15px',
                      border: '1px solid #d1d5db',
                      padding: '15px',
                      outline: 'none',
                      resize: 'none',
                      fontSize: '15px'
                    }}
                  />


                  {/* BUTTON */}
                  <button
                    onClick={() => sendReply(msg._id)}
                    style={{
                      marginTop: '15px',
                      padding: '14px 28px',
                      border: 'none',
                      borderRadius: '12px',
                      background: '#6366f1',
                      color: '#fff',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '15px'
                    }}
                  >
                    Send Reply
                  </button>

                </div>

              ))}
            </>

          )}

        </>

      )}

    </div>
  );
};

export default AdminContacts;