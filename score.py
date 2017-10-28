# Reads a file from command line and scores it
'''
Reads a file from command line and scores it
'''

import sys
import os
import re

def containsDigits(inputString):
    return any(char.isdigit() for char in inputString)


# Check for correct program usage
if len(sys.argv) == 1:
    print('usage: score.py <file_to_lint> <.pylintrc>')
else:
    # Run the linter on the designated file
    filename = sys.argv[1]
    lintrc = sys.argv[2]
    command = 'pylint --rcfile=.pylintrc ' + filename + ' > score.dat'
    os.system(command)

    # Parse the output and return a score
    datfile = 'score.dat'
    with open(datfile, 'r') as dat:
        for line in dat:
            if 'Your code has been rated at ' in line:
                resultsList = []
                for word in line.split(' '):
                    if containsDigits(word):
                        resultsList.append(word)
                result = ''
                for i in range(0, len(resultsList)):
                    num = re.findall(r"\d+\.\d+", resultsList[i])
                    if i == 0:
                        # print('currentScore: %s' % num[0])
                        result += num[0] + ' '
                    elif i == 1:
                        # print('lastScore: %s' % num[0])
                        result += num[0] + ' '
                    elif i == 2:
                        # print('change: %s' % num[0])
                        result += num[0] + ' '
                print(result)
                        # currentScore, lastScore, change

