@echo off && setlocal enabledelayedexpansion
for /r . %%i in (*) do (
    set a = %%i
    echo %%i
)
pause