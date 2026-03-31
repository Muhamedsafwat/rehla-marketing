'use client'
import React, { useState } from 'react'
import SendEmail from '../../_actions/SendEmail'
import { CheckLine, ChevronsLeft, ChevronsRight } from 'lucide-react'

const Form = ({ form, buttons, submit, market, s, m, locale }) => {
  const [selectedMarket, setSelectedMarket] = useState(null)
  const [selectedButton, setSelectedButton] = useState(null)
  const [formData, setFormData] = useState({
    subject: '',
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phoneNumber: '',
    message: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSelectButton = (i) => {
    setSelectedButton(i)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTextareaChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      message: e.target.value,
    }))
  }

  const showTemporaryMessage = (type, msg) => {
    if (locale === 'ar') {
      msg =
        msg === 'Please select a button'
          ? 'يرجى اختيار الزر'
          : msg === 'Please select a market'
            ? 'يرجى اختيار السوق'
            : msg.startsWith('Please fill in the')
              ? msg.replace('Please fill in the', 'يرجى ملء حقل')
              : msg
    }

    if (type === 'success') setMessage(msg)
    else setError(msg)

    setTimeout(() => {
      setMessage('')
      setError('')
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    if (selectedButton === null) {
      showTemporaryMessage('error', 'Please select a button')
      setLoading(false)
      return
    }

    if (!selectedMarket) {
      showTemporaryMessage('error', 'Please select a market')
      setLoading(false)
      return
    }

    for (const key of Object.keys(formData)) {
      if (!formData[key] || formData[key].trim() === '') {
        const fieldName = form[key] || key
        showTemporaryMessage('error', `Please fill in the ${fieldName} field`)
        setLoading(false)
        return
      }
    }

    const payload = {
      selectedButton: buttons[selectedButton].name,
      selectedMarket: market[selectedMarket],
      ...formData,
    }

    console.log('Sending payload:', payload)

    try {
      const res = await SendEmail(payload)

      if (res.message) {
        showTemporaryMessage('success', res.message)
        setFormData({
          subject: '',
          title: '',
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phoneNumber: '',
          message: '',
        })
        setSelectedButton(null)
        setSelectedMarket(null)
      } else {
        showTemporaryMessage('error', res.error || 'Failed to send email')
      }
    } catch (err) {
      showTemporaryMessage('error', err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col lg:flex-row gap-20 justify-center items-center lg:items-start lg:justify-between w-full">
        <div className="flex flex-col justify-start items-start mt-20 text-white">
          <div className="text-2xl lg:text-4xl cursor-pointer whitespace-nowrap">
            {buttons.map((b, i) => (
              <p
                key={i}
                onClick={() => handleSelectButton(i)}
                className={`${selectedButton === i ? 'text-white italic transition-all duration-300' : 'text-white/50 hover:text-white/80 transition-all duration-100'} my-4`}
              >
                {b.name}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-16 text-white w-full py-10 px-4">
          <div className="uppercase futura text-lg max-sm:text-sm leading-[28.16px] font-medium text-white/70 w-full max-w-2xl">
            {Object.entries(form).map(([key, label]) => (
              <div
                key={key}
                className="flex flex-col justify-center items-start w-full mb-5 sm:mb-6"
              >
                <label htmlFor={key} className="mb-2 tracking-wide text-white/70 text-xl lg:2xl">
                  {label}*
                </label>
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  required
                  id={key}
                  value={formData[key] || ''}
                  onChange={handleInputChange}
                  name={key}
                  className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder-white/30 focus:outline-none transition-all ease-in-out duration-300 py-2 focus:border-image-slice-[1] border-gradient-focus focus:border-b-2"
                />
              </div>
            ))}
            <div className="lg:hidden flex flex-col items-start">
              <label className="mb-2 tracking-wide text-white/70 text-xl lg:2xl">{m}</label>
              <textarea
                value={formData.message || ''}
                onChange={handleTextareaChange}
                required
                className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder-white/30 focus:outline-none transition-all ease-in-out duration-300 py-2 focus:border-image-slice-[1] border-gradient-focus focus:border-b-2"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-10 lg:mt-24 justify-center items-start text-white whitespace-nowrap">
          <p className="uppercase text-xl lg:text-2xl max-sm:text-sm leading-[160%] font-medium text-white mb-6">
            {s}
          </p>

          <div className="max-w-4xl max-h-48 flex flex-row flex-wrap gap-6 mb-6">
            {Object.entries(market).map(([key, label]) => (
              <div
                key={key}
                onClick={() => setSelectedMarket(key)}
                className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                  selectedMarket === key
                    ? 'text-white font-medium'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {selectedMarket === key && <CheckLine />}
                <p className="text-lg whitespace-nowrap">{label}</p>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex flex-3 flex-col mt-10 w-full h-full">
            <p
              className={`uppercase ${locale === 'en' ? 'text-left' : 'text-right'} text-xl lg:text-2xl leading-[28.16px] font-medium text-white/70 group-focus-within:text-white`}
            >
              {m}
            </p>
            <textarea
              required
              rows={15}
              value={formData.message || ''}
              onChange={handleTextareaChange}
              className="w-full my-2 bg-transparent border-b-2 border-white/30 text-white placeholder-white/30 focus:outline-none transition-all ease-in-out duration-300 py-2 focus:border-image-slice-[1] border-gradient-focus focus:border-b-2"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center my-10">
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-transparent text-white uppercase text-lg font-medium border border-white rounded-full px-6 py-3 cursor-pointer transition-all duration-300 hover:bg-white hover:text-black ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              {submit}
              {locale === 'en' ? (
                <ChevronsRight className="w-6 h-6" />
              ) : (
                <ChevronsLeft className="w-6 h-6" />
              )}
            </>
          )}
        </button>

        {message && (
          <div className="fixed top-15 right-5 bg-green-500 px-4 py-3 rounded shadow-lg text-white font-medium transition-all duration-300">
            {message}
          </div>
        )}
        {error && (
          <div className="fixed top-15 right-5 bg-red-500 px-4 py-3 rounded shadow-lg text-white font-medium transition-all duration-300">
            {error}
          </div>
        )}
      </div>
    </form>
  )
}

export default Form
