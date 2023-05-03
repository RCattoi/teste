import { fireEvent, render, screen } from '@testing-library/react';
import { expect, jest, waitFor } from '@jest/globals';
import '@testing-library/jest-dom';
import Background from '../Components/Background';

// jest.mock('../Hooks/useFetch.js');

describe('Background', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should set background image from API if local storage is empty', async () => {
    const apiUrl = 'http://localhost:8080/bingImgAPI';
    const imgUrl = '/image.jpg';
    const imgStartDate = '2023-01-01';
    const response = { json: { imgUrl, imgStartDate } };
    global.fetch({ ok: true, json: () => response });

    render(<Background />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(apiUrl));

    expect(localStorage.getItem('bingImageUrl')).toEqual(
      `https://www.bing.com${imgUrl}`
    );
    expect(localStorage.getItem('bingImageDate')).toEqual(imgStartDate);
    expect(document.body.style.backgroundImage).toEqual(
      `url(${localStorage.getItem('bingImageUrl')})`
    );
  });
});
