import hedy
from test_level_01 import HedyTester
import hedy_translation
from test_translating import check_local_lang_bool


# tests should be ordered as follows:
# * Translation from English to Dutch
# * Translation from Dutch to English
# * Translation to several languages
# * Error handling


class TestsTranslationLevel11(HedyTester):
    level = 15

    @check_local_lang_bool
    def test_while_loop_english_dutch(self):
        code = "answer is 0\n" \
               "while answer != 25\n" \
               "    answer is ask 'What is 5 * 5'\n" \
               "print 'Good job!'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "answer is 0\n" \
                   "zolang answer != 25\n" \
                   "    answer is vraag 'What is 5 * 5'\n" \
                   "print 'Good job!'"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_while_loop_dutch_english(self):
        code = "answer is 0\n" \
               "zolang answer != 25\n" \
               "    answer is vraag 'What is 5 * 5'\n" \
               "print 'Good job!'"

        result = hedy_translation.translate_keywords(code, from_lang="nl", to_lang="en", level=self.level)
        expected = "answer is 0\n" \
                   "while answer != 25\n" \
                   "    answer is ask 'What is 5 * 5'\n" \
                   "print 'Good job!'"

        self.assertEqual(result, expected)

    @check_local_lang_bool
    def test_multiple_while_loop_english_dutch(self):
        code = "answer is 0\n" \
               "while answer != 25\n" \
               "    while answer > 30\n" \
               "        answer is ask 'What is 5 * 5'\n" \
               "print 'Good job!'"

        result = hedy_translation.translate_keywords(code, from_lang="en", to_lang="nl", level=self.level)
        expected = "answer is 0\n" \
                   "zolang answer != 25\n" \
                   "    zolang answer > 30\n" \
                   "        answer is vraag 'What is 5 * 5'\n" \
                   "print 'Good job!'"

        self.assertEqual(result, expected)